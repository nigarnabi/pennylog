require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const categoriesRouter = require("./routes/categories");
const expensesRouter = require("./routes/expenses");
const authRouter = require("./routes/auth");
const accountsRouter = require("./routes/accounts");
const goalsRouter = require("./routes/goals");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use("/categories", categoriesRouter);
app.use("/expenses", expensesRouter);
app.use("/auth", authRouter);
app.use("/accounts", accountsRouter);
app.use("/goals", goalsRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("API running on http://localhost:" + PORT);
});
