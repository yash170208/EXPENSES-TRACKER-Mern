const IncomeSchema = require("../models/IncomeModel");

exports.addIncome = async (req, res) => {
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

    const income = new IncomeSchema({
      title,
      amount,
      category,
      description,
      date,
    });

    await income.save();

    res.status(200).json({ message: "Income Added", income });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getIncomes = async (req, res) => {
  try {
    const incomes = await IncomeSchema.find().sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteIncome = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedIncome = await IncomeSchema.findByIdAndDelete(id);
    
    if (!deletedIncome) {
      return res.status(404).json({ message: "Income not found" });
    }

    res.status(200).json({ message: "Income Deleted", income: deletedIncome });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
