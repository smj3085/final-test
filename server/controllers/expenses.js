const Expenses = require('../models/Expenses');

// @desc Get all transactions
// @route GET /api/v1/transactions
// @access Public
exports.getExpenses = async (req, res, next) => {
    try {
        const expenses = await Expenses.find();

        return res.status(200).json({
            success: true,
            count: expenses.length,
            data: expenses
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            error: "Server error"
        })
    }
}

// @desc Add transactions
// @route POST /api/v1/transactions
// @access Public
exports.addExpenses = async (req, res, next) => {
    try {
        const { text, amount } = req.body;

        const expenses = await Expenses.create(req.body);

        return res.status(201).json({
            success: true,
            data: expenses
        })
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(value => value.message);

            return res.status(400).json({
                success: false,
                error: messages
            })
        }
        else {
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
}

// @desc Delete transactions
// @route DELETE /api/v1/transactions/:id
// @access Public
exports.deleteExpenses = async (req, res, next) => {
    try {
        const expenses = await Expenses.findById(req.params.id);

        if (!expenses) {
            return res.status(404).json({
                success: false,
                error: 'No expense found'
            });
        }

        await expenses.remove();

        return res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}