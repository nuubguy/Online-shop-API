const express = require('express');
const router = express.Router();
const userController = require('../controller/users');

router.route('/')
.get(userController.fetchAll)
.post(userController.addUser);

router.route('/:name')
.get(userController.fetchByName),

router.route('/:userId')
.patch(userController.updateUser),




module.exports = router;