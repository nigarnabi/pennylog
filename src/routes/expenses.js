const express = require("express");
const prisma = require("../db");
const { getCurrentUserId } = require("../lib/helpers");
const router = express.Router();

// GET /expenses - Get all expenses for the current user
router.get("/", async (req, res) => {
  try {
    const userId = getCurrentUserId(req);
    const { from, to, categoryId } = req.query;

    const where = { userId };
    // Apply date range filter if provided
    if (from || to) {
      where.date = {};
      if (from) {
        where.date.gte = new Date(from);
      }
      if (to) {
        where.date.lte = new Date(to);
      }
    }
    // Apply category filter if provided
    if (categoryId) {
      const parsedCategoryId = parseInt(categoryId, 10);
      if (!isNaN(parsedCategoryId)) {
        where.categoryId = parsedCategoryId;
      }
    }
    const expenses = await prisma.expense.findMany({
      where,
      orderby: { date: "desc" },
      include: { category: true },
    });
    res.json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
});

// POST /expenses - Create a new expense for the current user

router.post("/", async (req, res) => {
  try {
    const userId = getCurrentUserId(req);
    const { amount, currency, date, categoryId, description } = req.body;

    // Validate input

    if (amount === undefined || typeof amount !== "number") {
      return res.status(400).json({ error: "amount (number) is required" });
    }
    if (!description || typeof description !== "string") {
      return res
        .status(400)
        .json({ error: "description (string) is required" });
    }
    if (!date || typeof date !== "string") {
      return res.status(400).json({ error: "date (ISO string) is required" });
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ error: "Invalid date format" });
    }
    const parsedCategoryId = parseInt(categoryId, 10);
    if (isNaN(parsedCategoryId)) {
      return res.status(400).json({ error: "Invalid categoryId" });
    }

    const expense = await prisma.expense.create({
      data: {
        amount,
        currency,
        date: parsedDate,
        description,
        categoryId: parsedCategoryId,
        userId,
      },
      include: { category: true },
    });
    res.status(201).json(expense);
  } catch (error) {
    console.error("Error creating expense:", error);
    res.status(500).json({ error: "Failed to create expense" });
  }
});

// Put /expenses/:id - Update an existing expense for the current user

router.put("/:id", async (req, res) => {
  try {
    const userId = getCurrentUserId(req);
    const expenseId = parseInt(req.params.id, 10);
    if (isNaN(expenseId)) {
      return res.status(400).json({ error: "Invalid expense ID" });
    }

    const { amount, currency, date, description, categoryId } = req.body;

    // Ensure the expense belongs to the current user
    const existing = await prisma.expense.findFirst({
      where: { id: expenseId, userId },
    });

    if (!existing) {
      return res.status(404).json({ error: "Expense not found" });
    }

    const dataToUpdate = {};

    if (amount !== undefined) {
      if (typeof amount !== "number") {
        return res.status(400).json({ error: "amount must be a number" });
      }
      dataToUpdate.amount = Math.round(amount * 100);
    }

    if (currency !== undefined) {
      dataToUpdate.currency = currency;
    }

    if (description !== undefined) {
      dataToUpdate.description = description;
    }

    if (date !== undefined) {
      const parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) {
        return res.status(400).json({ error: "Invalid date format" });
      }
      dataToUpdate.date = parsedDate;
    }

    if (categoryId !== undefined) {
      if (categoryId === null) {
        dataToUpdate.categoryId = null;
      } else {
        const parsedCategoryId = parseInt(categoryId, 10);
        if (isNaN(parsedCategoryId)) {
          return res
            .status(400)
            .json({ error: "categoryId must be a number or null" });
        }

        const category = await prisma.category.findFirst({
          where: {
            id: parsedCategoryId,
            userId,
          },
        });

        if (!category) {
          return res
            .status(400)
            .json({ error: "Category not found for this user" });
        }

        dataToUpdate.categoryId = parsedCategoryId;
      }
    }

    const updated = await prisma.expense.update({
      where: { id: expenseId },
      data: dataToUpdate,
      include: {
        category: true,
      },
    });

    res.json(updated);
  } catch (err) {
    console.error("Error updating expense:", err);
    res.status(500).json({ error: "Failed to update expense" });
  }
});

// DELETE /expenses/:id - Delete an expense for the current user

router.delete("/:id", async (req, res) => {
  try {
    const userId = getCurrentUserId(req);
    const expenseId = parseInt(req.params.id, 10);
    if (isNaN(expenseId)) {
      return res.status(400).json({ error: "Invalid expense ID" });
    }

    // Ensure the expense belongs to the current user
    const existing = await prisma.expense.findFirst({
      where: { id: expenseId, userId },
    });
    if (!existing) {
      return res.status(404).json({ error: "Expense not found" });
    }

    await prisma.expense.delete({
      where: { id: expenseId },
    });
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting expense:", err);
    res.status(500).json({ error: "Failed to delete expense" });
  }
});

module.exports = router;
