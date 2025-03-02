const http = require("http")
const app  =  require("./app")
const PORT  = 3000
const {initializeSocket} = require("./socket")

const server = http.createServer(app)
initializeSocket(server)

server.listen(PORT, ()=>{
    console.log(`Connected to Server on the port ${PORT}`)
})