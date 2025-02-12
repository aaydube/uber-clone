const { validationResult } = require("express-validator")
const driverModel = require("../models/driver.model")
const driverService = require("../services/driver.services")
const cookie = require("cookie-parser")

module.exports.registerDriver = (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty){
        res.status(401).json({
            message: "Validation Error", errors
        })
    }
    const {fullname, email, password, vehicle} = req.body
    const pass = driverModel.hashPassword(password)
    const {firstname, lastname} = fullname
    const driver = driverService.createCaptain(firstname, lastname, email, {password: pass}, vehicle.color, vehicle.plate, vehicle.capacity, vehicle.vehicleType  )
    
    const token = driver.generateToken()
    res.cookie("token", token)
}

module.exports.loginDriver = ()=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(401).json({message: "Validation Error", errors})
    }
    const {email, password} = req.body
    const driver = driverModel.findOne({email})
    const is = driver.comparePassword()
}
module.exports.Profile = {}
module.exports.logout = {}