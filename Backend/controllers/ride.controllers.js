const { validationResult } = require("express-validator");
const rideService = require("../services/ride.services");
const mapService = require("../services/maps.services")
const rideModel = require("../models/ride.model")
const {sendMessageToSocketId } = require("../socket")

module.exports.createRide = async(req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).json({ errors: errors.array() });
  }

  try {
    const { pickup, destination, vehicleType } = req.body;
    const ride = await rideService.createRide({user: req.user._id, pickup, destination, vehicleType})
    res.status(201).json(ride)

    const pickupCoordinates = await mapService.getAddressCoordinate(pickup)
    const driversInRadius = await mapService.getDriversInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 2) 
    const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');
    if (!driversInRadius.length) {
      console.log("No drivers found in the radius");
    }
    
    driversInRadius.map(driver=>{
      sendMessageToSocketId(driver.socketId,{
        event: "new-user",
        data: rideWithUser
      })
    })

  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports.getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).json({ errors: errors.array() });
  }

  try {
    const { pickup, destination } = req.query;
    const fare = await rideService.getFare(pickup, destination);
    return res.status(201).json(fare);
  } catch (error) {
    return res
      .status(401)
      .json({ message: "fare not found", errors: error.message });
  }
};


module.exports.confirmRide = async(req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).json({ errors: errors.array() });
  }

  const {rideId} = req.body
  
  try {
    const ride = await rideService.confirmRide({driver:req.driver, rideId})
    sendMessageToSocketId(ride.user.socketId,{
      event: "ride-accepted",
      data: ride
    })
    
  } catch (error) {
    return res.status(401).json({message: error.message})
  }
  
}

module.exports.startRide = (req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).json({ errors: errors.array() });
  }

  const {rideId, otp} = req.body
  try {
    const ride = rideService.startRide({rideId, driver:req.driver, otp })
    sendMessageToSocketId(ride.user.socketId,{
      event: "ride-started",
      data: ride
    })
    
  } catch (error) {
    return res.status(401).json({message: error.message})
  }


}


module.exports.endRide = (req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).json({ errors: errors.array() });
  }

  const {rideId} = req.body
  try {
    const ride = rideService.endRide({rideId, driver: req.driver})
    sendMessageToSocketId(ride.user.socketId,{
      event: "ride-ended",
      data: ride
    })
    
  } catch (error) {
    return res.status(401).json({message: error.message})
  }

}