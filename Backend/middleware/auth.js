const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model")
const driverModel = require("../models/driver.model")

module.exports.userAuth = async (req, res, next) => {
  try {
      const token = await req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
      const decoded = await jwt.verify(token , process.env.JWT_SECRET);
      const user = await userModel.findById(decoded._id)
      req.user = user
      return next()
      
    } catch (error) {
      res.status(401).json({message: "Unauthorized", error: error.message})
    }
};

module.exports.driverAuth = async(req,res,next)=>{
  try {
    const token = await req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    const driver = await driverModel.findById(decoded._id)
    req.driver = driver
    return next()
    
  } catch (error) {
    return res.status(401).json({message: "Unauthorized", error: error.message})
  }
  
}