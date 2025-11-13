const express = require("express");
const prisma = require("../db");
const router = express.Router();

const { getCurrentUserId } = require("../lib/helpers");

// GET /categories - Get all categories for the current user

router.get("/", async (req, res) => {
  try {
    const userId = getCurrentUserId(req);
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

router.post("/", async (req, res) => {
  try {
    const userId = getCurrectUserId(req);
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
