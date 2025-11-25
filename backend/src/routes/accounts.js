const express = require("express");
const prisma = require("../db");
const requireAuth = require("../middleware/requireAuth");
const { getCurrentMonthRange } = require("../lib/helpers");

const router = express.Router();

// GET /api/accounts - get or lazily create the user's single account
router.get("/", requireAuth, async (req, res) => {
  try {
    const userId = req.userId;

    // use let because we might reassign
    let account = await prisma.account.findFirst({
      where: { userId },
    });

    // If no account exists yet (old user), create a default one
    if (!account) {
      account = await prisma.account.create({
        data: {
          userId,
          name: "Cash",
          description: "My cash account",
          type: "CASH",
          currency: "EUR",
          currentBalance: 0,
        },
      });

      return res.json({
        ...account,
        spentThisMonth: 0,
      });
    }

    // Compute "spent this month" from user's expenses
    const { start, end } = getCurrentMonthRange();

    const agg = await prisma.expense.aggregate({
      _sum: { amount: true },
      where: {
        userId,
        date: {
          gte: start,
          lt: end,
        },
      },
    });

    const spentThisMonth = agg._sum.amount || 0; // in cents

    return res.json({
      ...account,
      spentThisMonth,
    });
  } catch (error) {
    console.error("Error fetching account:", error);
    return res.status(500).json({ error: "Failed to fetch account" });
  }
});

// PUT /api/accounts - Update account details
router.put("/", requireAuth, async (req, res) => {
  try {
    const userId = req.userId;
    const { name, description, type, currency, currentBalance } = req.body;

    // Use findFirst so it works even if userId is not marked @unique
    const existingAccount = await prisma.account.findFirst({
      where: { userId },
    });

    if (!existingAccount) {
      return res.status(404).json({ error: "Account not found" });
    }

    const updatedAccount = await prisma.account.update({
      // safest to update by primary key id
      where: { id: existingAccount.id },
      data: {
        name: name ?? existingAccount.name,
        description:
          description !== undefined ? description : existingAccount.description,
        type: type ?? existingAccount.type,
        currency: currency ?? existingAccount.currency,
        currentBalance:
          currentBalance !== undefined
            ? currentBalance
            : existingAccount.currentBalance,
      },
    });

    return res.json(updatedAccount);
  } catch (error) {
    console.error("Error updating account:", error);
    return res.status(500).json({ error: "Failed to update account" });
  }
});

module.exports = router;
