// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Create an instance of Express
const app = express();

// Create an HTTP server from the Express app
const server = http.createServer(app);

// Attach Socket.io to the HTTP server
const io = socketIo(server);

// Set the port (using an environment variable or defaulting to 5000)
const port = process.env.PORT || 6969;

// Set up a basic route (optional, for testing)
app.get('/', (req, res) => {
  res.send('Backend server is running');
});

// Listen for socket connections
io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Listen for a test event from the client
  socket.on('testEvent', (data) => {
    console.log('Received testEvent with data:', data);
    // Send a response back to the client
    socket.emit('testResponse', { message: 'Hello from the backend!' });
  });

  // Handle client disconnection
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
