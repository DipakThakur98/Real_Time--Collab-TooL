const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { JWT_SECRET } = require('./config/jwt');

process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.error(err.name, err.message, err.stack);
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION! 💥 Shutting down...');
    console.error(err.name, err.message, err.stack);
    process.exit(1);
});

const authRoutes = require('./routes/authRoutes');
const documentRoutes = require('./routes/documentRoutes');
const messageRoutes = require('./routes/messageRoutes');
const blogRoutes = require('./routes/blogRoutes');
const socialRoutes = require('./routes/socialRoutes');
const adminRoutes = require('./routes/adminRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const pool = require('./config/db');

// Test DB Connection
pool.getConnection()
    .then(connection => {
        console.log('✅ SERVER connected successfully');
        console.log('✅ DATABASE connected successfully');
        connection.release();
    })
    .catch(err => {
        console.error('❌ Database connection failed:', err.message);
        process.exit(1);
    });

const app = express();
const server = http.createServer(app);

app.use(cors({
    origin: (origin, callback) => {
        // Allow all origins in development to support ngrok/localtunnel
        callback(null, true);
    },
    credentials: true
}));

const io = new Server(server, {
    cors: {
        origin: (origin, callback) => {
            callback(null, true);
        },
        methods: ['GET', 'POST'],
        credentials: true
    }
});

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Real Time Collab Tool Backend Running 🚀');
});

// Attach io to req
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/social', socialRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/notifications', notificationRoutes);

// Socket.IO Middleware for Auth
io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error('Authentication error'));

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        socket.user = decoded;
        next();
    } catch (err) {
        next(new Error('Authentication error'));
    }
});

const documentSocket = require('./sockets/documentSocket');
documentSocket(io);

const adminSocket = require('./sockets/adminSocket');
adminSocket(io);

// Track global active users
io.on('connection', (socket) => {
    // Broadcast current client count to all connected users
    io.emit('active-users-count', io.engine.clientsCount);
    
    socket.on('disconnect', () => {
        // Wait a tick for the socket to fully leave before counting
        setTimeout(() => {
            io.emit('active-users-count', io.engine.clientsCount);
        }, 0);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
