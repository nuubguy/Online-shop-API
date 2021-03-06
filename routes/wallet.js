const express = require('express');
const router = express.Router();
const walletController = require('../controller/wallet');

router.route('/')
.get(walletController.fetchAll);

router.route('/:userId')
.post(walletController.addWallet);

router.route('/:walletId')
.delete(walletController.deleteWallet);

router.route('/:walletId/:walletIdReceiver')
.post(walletController.transfer);


module.exports = router;