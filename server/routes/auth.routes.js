const express = require('express')
const {forgetPassword, login, registration, forgetPasswordVerification} = require('../controllers/auth.controller.js')
const authMiddleware = require('../middlewares/auth.middleware.js')
const verify  = require('../middlewares/auth.middleware.js')
// const { upload } = require('../controllers/employee.controller.js')

const router=express.Router();

router.post('/login', login);
// router.post('/register', upload.single("profileImage"), registration);
router.post('/register', registration);
router.post('/verify', authMiddleware, verify);
router.post('/forget-password-link', forgetPasswordVerification);
router.put('/forget-password', forgetPassword);

module.exports = router;