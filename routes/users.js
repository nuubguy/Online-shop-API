const express = require('express');
const router = express.Router();
const userController = require('../controller/users');

router.route('/')
.get(userController.fetchAll)
.post(userController.addUser);

router.route('/name')
.get(userController.fetchByName);



module.exports = router;