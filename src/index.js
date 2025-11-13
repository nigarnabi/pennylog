require("dotenv").config();
const express = require("express");
const cors = require("cors");
const createTestUser = require("./lib/helpers");
const categoriesRouter = require("./routes/categories");
const expensesRouter = require("./routes/expenses");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/categories", categoriesRouter);
app.use("/expenses", expensesRouter);

const PORT = process.env.PORT || 4000;

async function main() {
  const userId = await createTestUser();
  app.locals.currentUserId = userId;
  console.log("Fake user ready with ID:", userId);

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}

main().catch((error) => {
  console.error("Error starting the server:", error);
  process.exit(1);
});
