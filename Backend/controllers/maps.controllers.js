const { validationResult } = require("express-validator")
const { getAddressCoordinate, getDistanceTime, getAutoCompleteSuggestions } = require("../services/maps.services")


module.exports.getCoordinates = async(req,res) =>{
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(401).json({
      message: "Validation Error", error: errors.array()
    })
  }

  try {
      const {address} = req.query
      const coordinates = await getAddressCoordinate(address)
      return res.status(201).json(coordinates)

  } catch (error) {
    return res.status(401).json({message: "coordinates not found", errors: error.message})
  }
}


module.exports.getDistance = async(req,res) =>{
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(401).json({message: "validation error", error: errors.array()})
  }

  try {
    const {origin, destination} = req.query
    const distanceTime = await getDistanceTime(origin, destination)
    return res.status(201).json(distanceTime)
    
  } catch (error) {
    return res.status(401).json({message: "distance not found", errors: error.message})
  }
}


module.exports.getSuggestions = async(req,res) =>{
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(401).json({message: "validation error", error: errors.array()})
  }
  try {
    const {input} = req.query
    const suggestions = await getAutoCompleteSuggestions(input)
    res.status(201).json(suggestions)
    
  } catch (error) {
    return res.status(401).json({message: "suggestions not found", errors: error.message})
  }
}