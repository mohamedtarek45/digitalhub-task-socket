import express from "express";
import http from "http";
import { Server } from "socket.io";
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

io.on("connection", (socket) => {

  socket.on("RevalidateTask", ({ projectId }) => {
    socket.broadcast.emit("RevalidateData", { projectId });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log("listening on *:4000");
});
