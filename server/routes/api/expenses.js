const express = require('express');
const router = express.Router();
const { getExpenses, addExpenses, deleteExpenses } = require('../../controllers/expenses');

// router.get('/', (req, res) => res.send('Hello'));
router
    .route('/')
    .get(getExpenses)
    .post(addExpenses);

router
    .route('/:id')
    .delete(deleteExpenses);

module.exports = router;