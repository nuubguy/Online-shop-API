const express = require('express');
const router = express.Router();
const transactionController = require('../controller/transaction');

router.route('/')
.get(transactionController.fetchAll);

router.route('/:walletId')
.post(transactionController.addTransaction);


module.exports = router;