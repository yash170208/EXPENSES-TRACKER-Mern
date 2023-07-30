const ExpenseSchema = require("../models/ExpenseModel");

exports.addExpense = async (req, res) => {
  try {
    const { title, amount, category, description, date } = req.body;

    if (!title || !amount || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    if (typeof amount !== "number" || amount <= 0) {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }

    const income = new ExpenseSchema({
      title,
      amount,
      category,
      description,
      date,
    });

    await income.save();

    res.status(200).json({ message: "Expense Added", income });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getExpense = async (req, res) => {
  try {
    const incomes = await ExpenseSchema.find().sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedIncome = await ExpenseSchema.findByIdAndDelete(id);
    
    if (!deletedIncome) {
      return res.status(404).json({ message: "Income not found" });
    }

    res.status(200).json({ message: "Expense Deleted", income: deletedIncome });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
