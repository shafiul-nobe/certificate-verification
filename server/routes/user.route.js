// imports
const express = require('express');
const userCtrl = require('../controllers/user.controller');
const {
    validateUserReq,
    validateUpdateUserReq
} = require('../middlewares/user.middleware');

// constants
const router = express.Router();

// endpoints
router.post('/', validateUserReq, userCtrl.createUser);
router.get('/', userCtrl.getUsers);
router.put('/', validateUpdateUserReq, userCtrl.editUser);
router.delete('/:userId', userCtrl.deleteUser);


// exports
module.exports = router;