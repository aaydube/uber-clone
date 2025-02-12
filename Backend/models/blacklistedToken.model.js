const mongoose = require("mongoose")

const blacklistedSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400 
    }
})

const blacklistedModel = mongoose.model("blacklisted", blacklistedSchema)
module.exports = blacklistedModel