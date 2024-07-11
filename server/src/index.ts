import express from "express";
import cors from 'cors';
import appRouter from './routes';
import config from './config/config';
import { InitializeServer } from "./utils/initializeServer";

const PORT = config.PORT || 5000;
const server = express();

console.clear();

server.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
server.use(express.json());
server.use(appRouter);

const app = server.listen(PORT, async () => {
    InitializeServer(app);
});