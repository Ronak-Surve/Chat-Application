const { Socket } = require("dgram");
const express = require("express");
const http = require("http");
const path = require("path");
const {Server} = require("socket.io");

//request listener
const app = express();

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname,"/index.html"));
})

//http server
const server = http.createServer(app);
const io = new Server(server);

//io server connection handler
io.on('connection', (socket) => {
    console.log("User Connected to Server", typeof(socket));

    socket.on('chat-message', (msg) => {
        console.log("message : ", msg);
        io.emit("user-message", msg);
    });

    

    socket.on("disconnect", () => {
        console.log("Client disconnected from Server");
    })

});

server.listen(3000, (req,res) =>    {
    console.log("server listening on PORT 3000");   
})

// Socket - A single client
// io - A server connecting to multiple clients