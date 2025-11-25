const express = require("express");
const prisma = require("../db");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");

// GET /categories - Get all categories for the current user

router.get("/", requireAuth, async (req, res) => {
  try {
    const userId = req.userId;
    const categories = await prisma.category.findMany({
      where: { userId },
      orderBy: { createdAt: "asc" },
    });
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

// POST /categories - Create a new category for the current user

router.post("/", requireAuth, async (req, res) => {
  try {
    const userId = req.userId;
    const { name } = req.body;
    if (!name || typeof name !== "string") {
      return res.status(400).json({ error: "Invalid category name" });
    }
    const newCategory = await prisma.category.create({
      data: {
        name,
        userId,
      },
    });
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Failed to create category" });
  }
});

module.exports = router;
