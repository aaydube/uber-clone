const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [ 3, 'First name must be at least 3 characters long' ],
        },
        lastname: {
            type: String,
            minlength: [ 3, 'Last name must be at least 3 characters long' ],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [ 5, 'Email must be at least 5 characters long' ],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
    },
})

userSchema.statics.hashPassword = function(password){
    const hashedPassword = bcrypt.hash(password, 10)
    return hashedPassword
}
userSchema.methods.comparePassword = function(password){
    const comparedPassword = bcrypt.compare(password, this.password)
    return comparedPassword
}
userSchema.methods.generateToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET,)
    return token
}

module.exports = mongoose.model("user", userSchema)