import Server from './api/models/Server';
import dotenv from 'dotenv';

dotenv.config();

const server: Server = new Server();
server.listen();