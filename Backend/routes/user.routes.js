const express = require("express")
const router = express.Router()
const { body } = require("express-validator")
const userController = require("../controllers/user.controllers")
const authMiddleware = require("../middleware/auth")

router.post("/register", [
    body("email").isEmail().withMessage("Invalid email & password"),
    body("password").isLength({min: 5}).withMessage("invalid email & password"),
    body("fullname").isLength({min: 5}).withMessage("invalid name")
], userController.registerUser)


router.post("/login", [
    body("email").isEmail().withMessage("invalid email & password"),
    body("password").isLength({min : 5}).withMessage("invalid email & password")
], userController.loginUser)

router.get("/profile", authMiddleware.userAuth, userController.getProfile)

router.get("/logout", authMiddleware.userAuth, userController.logout)

module.exports = router