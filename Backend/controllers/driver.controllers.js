const { validationResult } = require("express-validator")
const driverModel = require("../models/driver.model")
const driverService = require("../services/driver.services")

module.exports.registerDriver = async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty){
        res.status(401).json({
            message: "Validation Error", error: errors.array()
        })
    }
    try {
        const {fullname, email, password, vehicle} = req.body
        const pass = await driverModel.hashPassword(password)
        const {firstname, lastname} = fullname
        const driver = await driverService.createDriver(firstname, lastname, email, pass, vehicle.color, vehicle.plate, vehicle.capacity, vehicle.vehicleType  )
        const token = await driver.generateToken()
        res.cookie("token", token)
        return res.status(201).json({message: "User Registered Successfully", driver, token})
        
    } catch (error) {
        return res.status(401).json({message: "Server Error", error: error.message})
    }
    
}

module.exports.loginDriver = async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(401).json({message: "Validation Error", error: errors.array()})
    }
    try {
        const {email, password} = req.body
        const driver = await driverModel.findOne({email}).select("+password")
        const isCorrect = await driver.comparePassword(password)
        const token = await driver.generateToken()
        res.cookie("token", token)

        return res.status(201).json({message: "Logged In Successfully", token, driver})
    } catch (error) {
        return res.status(401).json({message: "Server Error", error: error.message})
    }
}
module.exports.Profile = (req,res)=>{
    return res.status(201).json(req.driver)
}
module.exports.logout = async(req,res)=>{
    try {
        const token = await req.cookies.token
        res.clearCookie(token)
        return res.status(201).json({message: "Logout Successfully"})
    } catch (error) {
        return res.status(401).json({message:"Server Error", error: error.message})
    }
}