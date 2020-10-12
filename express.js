
const express=require("express") ;
const socketio=require("socket.io") ;
//express server is created
const app=express() ;
//node js ka module hota hai httpserver uss app ko usse connct krdege
//basically server banane ke liye use krte hai
const httpserver=require("http").createServer(app) ;
const path = require("path");
//to create pool of servers
const io = socketio(httpserver) ;
//it defines the folder from client will recieve static assets
app.use(express.static("public")) ;
//first request listen
io.on("connection",function(socket){

    console.log("a user cnncted")
    socket.on("mousedown", function(point) {
        // console.log(data) ;
        
        socket.broadcast.emit("onmd",point) ;
      }) ;
      socket.on("mousemove", function(point) {
        // console.log(data) ;
        socket.broadcast.emit("onmv",point) ;
      });
      socket.on("size", function(size) {
        socket.broadcast.emit("onsize", size);
      });
      socket.on("color", function(color) {
        socket.broadcast.emit("oncolor", color);
      });
    
      socket.on("toolchange", function(tool) {
        socket.broadcast.emit("ontoolchange", tool);
      });
      socket.on("hamburger", function() {
        socket.broadcast.emit("onhamburger");
      });
      socket.on("undo", function() {
        socket.broadcast.emit("onundo");
      });
      socket.on("redo", function() {
        socket.broadcast.emit("onredo");
      });


}) ;
httpserver.listen(process.env.PORT || 3000, function () {
    console.log("Server is listening to request at port 3000");
})