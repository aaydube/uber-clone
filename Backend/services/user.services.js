const userModel = require("../models/user.model")

module.exports.createUser = async function(fullname, email, hashpass){
    const {firstname, lastname} = fullname

    if(!firstname || !email || !hashpass){
        res.status(400).json({message: "All fields are required"})
    }

    return await userModel.create({
        fullname: {firstname, lastname},
        email,
        password: hashpass
    })
}