import 'dotenv/config';
import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import { connectDb } from './config/db.js';
import { registerChatSocket } from './sockets/chatSocket.js';

const port = process.env.PORT || 5000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_ORIGIN }
});

app.use((req, _res, next) => {
  req.io = io;
  next();
});

registerChatSocket(io);

connectDb().then(() => {
  server.listen(port, () => {
    console.log(`Server listening on ${port}`);
  });
});
