const express = require("express");
const app = express()
const userRouter = require("./routes/user.routes")
const cookieParser = require("cookie-parser")
const dotenv = require("dotenv").config()
const cors = require("cors")
const ConnectToDB = require("./db/db")
ConnectToDB()

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/users", userRouter)


module.exports = app;