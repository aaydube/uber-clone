const blacklistedModel = require("../models/blacklistedToken.model");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model")

module.exports.userAuth = async (req, res, next) => {
  try {
      const token = await req.cookies.token;
      const isBlacklisted = await blacklistedModel.findOne({token})
      if(isBlacklisted){
        return res.status(401).json({message: "unauthorized"})
      }

      const decoded = await jwt.verify(token , process.env.JWT_SECRET);
      const user = await userModel.findById(decoded._id)
      req.user = user
      return next()
      
    } catch (error) {
      res.status(401).json({message: "Unauthorized", error: error.message})
    }
};
