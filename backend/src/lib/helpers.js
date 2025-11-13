const prisma = require("../db");
const { get } = require("../routes/categories");

async function createTestUser() {
  const user = await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      email: "test@example.com",
      name: "Test User",
    },
  });

  return user.id;
}

// get currect user id
function getCurrentUserId(req) {
  const userId = req.app.locals.currentUserId;
  if (!userId) {
    throw new Error("No current user ID set in app locals");
  }
  return userId;
}

module.exports = {
  createTestUser,
  getCurrentUserId,
};
