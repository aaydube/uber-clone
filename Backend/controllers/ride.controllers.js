const { validationResult } = require("express-validator");
const rideService = require("../services/ride.services");

module.exports.createRide = async(req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).json({ errors: errors.array() });
  }

  try {
    const { pickup, destination, vehicleType } = req.body;
    const ride = await rideService.createRide({user: req.user._id, pickup, destination, vehicleType})
    return res.status(201).json(ride)
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
