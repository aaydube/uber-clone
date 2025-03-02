const express = require("express")
const router = express.Router()
const {body, query} = require("express-validator")
const authMiddleware = require("../middleware/auth")
const rideController  = require("../controllers/ride.controllers")

router.post('/create',
    authMiddleware.userAuth,
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn([ 'auto', 'car', 'moto', 'premier' ]).withMessage('Invalid vehicle type'),
    rideController.createRide
)

router.post('/get-fare',
    query('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    rideController.getFare
)

router.post("/confirm", 
    authMiddleware.driverAuth,
    body('rideId').isString().isLength({ min: 3 }).withMessage('Invalid rideId'),
    rideController.confirmRide
)

router.post("/start-ride", 
    authMiddleware.driverAuth,
    body('rideId').isString().isLength({ min: 3 }).withMessage('Invalid rideId'),
    body('otp').isString().isLength({ min: 3, max: 6 }).withMessage('Invalid OTP'),
    rideController.startRide
)

router.post("/end-ride", 
    authMiddleware.driverAuth,
    body('rideId').isString().isLength({ min: 3 }).withMessage('Invalid rideId'),
    rideController.endRide
)

module.exports = router