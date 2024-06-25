import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
const route = require('./router/Route');
import { PrismaClient } from '@prisma/client';
import { prismaMiddleware } from './middleware/conexao/PrismaMiddleware';

dotenv.config();

declare global {
    namespace Express {
        interface Request {
            prisma: PrismaClient;
        }
    }
}

const app = express();
app.use(cors({origin:"*"}));
app.use(express.json());
const port = process.env.SERVICE_PORT;
  
app.use(prismaMiddleware);
app.use(route);

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});