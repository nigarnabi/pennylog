const express = require("express");
const prisma = require("../db");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();
const z = require("zod");
// zod schema for goal creation
const goalSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  targetAmount: z.number().min(1, "Target amount must be at least 1 cent"), // in cents
  currentAmount: z
    .number()
    .min(0, "Current amount cannot be negative")
    .optional(), // in cents
  targetDate: z
    .string()
    .min(1, "Target date is required")
    .refine((val) => !Number.isNaN(Date.parse(val)), {
      message: "Target date must be a valid date",
    }),
});

// Get all goals for the authenticated user

router.get("/", requireAuth, async (req, res) => {
  try {
    const userId = req.userId;
    const goals = await prisma.goal.findMany({
      where: { userId },
      orderBy: { createdAt: "asc" },
    });
    // even if no goals exist, return an empty array
    return res.json(goals);
  } catch (error) {
    console.error("Error fetching goals:", error);
    return res.status(500).json({ error: "Failed to fetch goals" });
  }
});

// POST /api/goals - Create a new goal
router.post("/", requireAuth, async (req, res) => {
  try {
    const userId = req.userId;
    const parsed = goalSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: "Invalid goal data",
        issues: z.treeifyError(parsed.error),
      });
    }
    const { name, targetAmount, currentAmount, targetDate } = parsed.data;

    const newGoal = await prisma.goal.create({
      data: {
        userId,
        name,
        targetAmount,
        currentAmount: currentAmount || 0,
        targetDate: new Date(targetDate),
      },
    });
    return res.status(201).json(newGoal);
  } catch (error) {
    console.error("Error creating goal:", error);
    return res.status(500).json({ error: "Failed to create goal" });
  }
});

// DELETE /api/goals/:id - Delete a goal by ID
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const userId = req.userId;
    const goalId = parseInt(req.params.id, 10);
    if (isNaN(goalId)) {
      return res.status(400).json({ error: "Invalid goal ID" });
    }
    // check if goal exists and belongs to user
    const goal = await prisma.goal.findUnique({
      where: { id: goalId },
    });
    if (!goal || goal.userId !== userId) {
      return res.status(404).json({ error: "Goal not found" });
    }
    await prisma.goal.delete({
      where: { id: goalId },
    });
    return res.status(204).end();
  } catch (error) {
    console.error("Error deleting goal:", error);
    return res.status(500).json({ error: "Failed to delete goal" });
  }
});

// PUT /api/goals/:id - Update a goal by ID
router.put("/:id", requireAuth, async (req, res) => {
  try {
    const userId = req.userId;
    const goalId = parseInt(req.params.id, 10);
    if (isNaN(goalId)) {
      return res.status(400).json({ error: "Invalid goal ID" });
    }
    // validate input
    const parsed = goalSchema.partial().safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: "Invalid goal data",
        issues: z.treeifyError(parsed.error),
      });
    }
    const data = parsed.data;
    const existingGoal = await prisma.goal.findUnique({
      where: { id: goalId },
    });
    if (!existingGoal || existingGoal.userId !== userId) {
      return res.status(404).json({ error: "Goal not found" });
    }
    // convert values if necessary
    const updateData = {
      name: data.name ?? existingGoal.name,
      targetAmount:
        data.targetAmount !== undefined
          ? data.targetAmount
          : existingGoal.targetAmount,
      currentAmount:
        data.currentAmount !== undefined
          ? data.currentAmount
          : existingGoal.currentAmount,
      targetDate:
        data.targetDate !== undefined
          ? new Date(data.targetDate)
          : existingGoal.targetDate,
    };
    const updatedGoal = await prisma.goal.update({
      where: { id: goalId },
      data: updateData,
    });
    return res.json(updatedGoal);
  } catch (error) {
    console.error("Error updating goal:", error);
    return res.status(500).json({ error: "Failed to update goal" });
  }
});

module.exports = router;
