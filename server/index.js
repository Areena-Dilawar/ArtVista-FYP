const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
const http = require('http'); // ✅ Required for socket.io
const socketIo = require('socket.io'); // ✅ Socket.io

const db = require('./database/db'); // Your DB connection
dotenv.config();

const app = express();
const server = http.createServer(app); // ✅ Create HTTP server
const io = socketIo(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:5173'], // ✅ support both ports
    methods: ['GET', 'POST']
  }
});

// ✅ Middlewares
app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// Allow larger JSON payloads (up to 10MB or more)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(fileUpload());
app.use('/uploads', express.static('uploads'));


app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - Body:`, req.body);
  next();
});

// ✅ Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const eventRoutes = require('./routes/eventRoutes');
const orderRoutes = require('./routes/orderRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const customOrderRoutes = require('./routes/customOrderRoutes');
const browseRoutes = require('./routes/browseRoutes');
const artistRoutes = require('./routes/artistRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/custom', customOrderRoutes);
app.use('/api/browse', browseRoutes);
app.use('/api/artists', artistRoutes);

// ✅ Real-time Chat Socket Setup
const messages = {}; // { artistId: [ { sender, text, timestamp } ] }

app.post('/api/message', (req, res) => {
  const { artistId, sender, text } = req.body;
  const msg = { sender, text, timestamp: new Date().toISOString() };
  if (!messages[artistId]) messages[artistId] = [];
  messages[artistId].push(msg);
  io.to(`artist_${artistId}`).emit('newMessage', msg);
  res.json({ success: true });
});

app.get('/api/message/:artistId', (req, res) => {
  const { artistId } = req.params;
  res.json(messages[artistId] || []);
});

io.on('connection', (socket) => {
  socket.on('joinRoom', (artistId) => {
    socket.join(`artist_${artistId}`);
  });
});

// ✅ Error Handler
app.use((err, req, res, next) => {
  console.error("Internal server error:", err);
  res.status(500).json({ message: "Internal server error", error: err.message });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`✅ Server & Socket.io running at http://localhost:${PORT}`);
});
