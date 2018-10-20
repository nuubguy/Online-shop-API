const express = require('express');
const router = express.Router();
const walletController = require('../controller/wallet');

router.route('/')
.get(walletController.fetchAll)
.post(walletController.addWallet);

router.route('/:walletId')
.delete(walletController.deleteWallet);

module.exports = router;