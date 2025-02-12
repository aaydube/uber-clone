const { validationResult } = require("express-validator");
const userServices = require("../services/user.services");
const userModel = require("../models/user.model");
const blacklistedModel = require("../models/blacklistedToken.model");

module.exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: "validation error" }, errors.array());
  }

  const { fullname, password, email } = req.body;

  try {
    const hashpass = await userModel.hashPassword(password);
    const user = await userServices.createUser(fullname, email, hashpass);

    const token = await user.generateToken();
    res.cookie("token", token);

    return res
      .status(201)
      .json({ message: "User created Successfully", user: user });
  } catch (error) {
    return res
      .status(401)
      .json({ message: "server error", errors: error.message });
  }
};

module.exports.loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "validation error",
      error: errors.array(),
    });
  }

  const { password, email } = req.body;
  try {
    const user = await userModel.findOne({ email: email }).select("+password");
    const pass = await user.comparePassword(password);
    const token = await user.generateToken();
    res.cookie("token", token);

    return res
      .status(201)
      .json({ message: "Logged In Successfully", user: user , token:token});
  } catch (error) {
    return res.status(401).json({
      message: "Server error",
      errors: error.message,
    });
  }
};

module.exports.getProfile = async (req, res) => {
  res.status(201).json(req.user);
};

module.exports.logout = async (req, res) => {
  try {
    const token = req.cookies.token;
    const blacklistedUser = await blacklistedModel.create({ token });
    res.clearCookie(token);
    return res.status(201).json({message: "Logout Successfully"})
  } catch (error) {
    return res.status(401).json({message: "Server error", error: error.message})
  }
};
