const express = require("express")
const router  = express.Router()
const mapControllers = require("../controllers/maps.controllers")
const { query } = require("express-validator")


router.post("/get-coordinates", [
  query("address").isLength({min: 3}).withMessage("invalid coordinates"),
], mapControllers.getCoordinates)

router.post("/get-distance", [
  query("origin").isLength({min: 3}).withMessage("invalid origin"),
  query("destination").isLength({min: 3}).withMessage("invalid destination"),
], mapControllers.getDistance)

router.post("/get-suggestions", [
  query("input").isLength({min: 2}).withMessage("invalid input"),
], mapControllers.getSuggestions)



module.exports  = router