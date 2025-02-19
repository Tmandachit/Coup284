require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

app.use(cors());
app.use(express.json());

// Store lobbies and users
const lobbies = {}; // { lobbyName: [user1, user2, ...] }

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // User joins a lobby
  socket.on("join-lobby", ({ username, lobby }) => {
    if (!lobbies[lobby]) {
      lobbies[lobby] = [];
    }
    
    if (!lobbies[lobby].includes(username)) {
      lobbies[lobby].push(username);
    }
    
    socket.join(lobby);
    console.log(`${username} joined lobby: ${lobby}`);

    // Send updated lobby members to everyone in the lobby
    io.to(lobby).emit("lobby-update", lobbies[lobby]);
  });

  // User disconnects -> remove them from lobbies
  socket.on("disconnecting", () => {
    for (const lobby of socket.rooms) {
      if (lobbies[lobby]) {
        // Find the user and remove them
        lobbies[lobby] = lobbies[lobby].filter(user => user !== socket.id);
        
        // Update the remaining members
        io.to(lobby).emit("lobby-update", lobbies[lobby]);
      }
    }
  });

  // Handle full disconnect
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(5001, () => console.log("Server started on port 5001"));
