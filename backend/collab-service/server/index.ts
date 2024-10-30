// backend/collab-service/server/index.ts

import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import logger from '../utils/logger';

import createRoomRouter from '../create-room/createRoomRouter';
import { setupWebSocketServer } from '../websocket/websocketServer';

dotenv.config({ path: './.env' });

const app = express();
app.use(cors());
app.use(express.json());

app.use(createRoomRouter);

const PORT = process.env.PORT || 5003;
const server = createServer(app);

setupWebSocketServer(server);

server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

