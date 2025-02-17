require('dotenv').config();

// dependencies
const express = require('express');
const cors = require('cors');  // Import CORS
const { default: mongoose } = require('mongoose');
const app = express();
const server = require('http').Server(app)
const { Socket } = require('socket.io');
app.use(cors()); // Enable CORS

// mongodb
mongoose.connect(process.env.DATABASEURL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))
app.use(express.json())


// Chat stuff
const io = require('socket.io')(5002, {
  cors: {
    origin: ['http://localhost:3000'],
  }
})

io.on('connect', socket => {
  console.log(`Connected with id ${socket.id}`)
  socket.on('send-message', () => {
    io.emit("recieve-message")
  })
})

app.listen(5001, () => console.log("Server started on port 5001"));
