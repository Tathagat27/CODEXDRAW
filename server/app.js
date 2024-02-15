import {Server} from 'socket.io';
import express from 'express'
import http from 'http';
import { ACTIONS } from '../client/src/Actions.js';
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, '..', 'client',  'dist')));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client',  'dist', 'index.html'));
})

const userSocketMap = {};
function getAllConnectedClients(roomId) {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId],
      }
    }
  )
}

io.on('connection', (socket) => {
  socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
    userSocketMap[socket.id] = username;
    socket.join(roomId);
    const clients = getAllConnectedClients(roomId);
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(ACTIONS.JOINED, {
        clients,
        username,
        socketId: socketId,
      })
    })
  })

  socket.on(ACTIONS.CODE_CHANGE, ({roomId, value: code}) => {
    socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { roomId, code });
  })

  socket.on(ACTIONS.BOARD_CHANGE, ({roomId, lines: slines}) => {
    socket.in(roomId).emit(ACTIONS.BOARD_CHANGE, { roomId, slines });
  })

  socket.on('disconnecting', () => {
    const rooms = [...socket.rooms];

    rooms.forEach((roomId) => {
      socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      })
    })

    delete userSocketMap[socket.id]
    socket.leave();
  })
})

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));