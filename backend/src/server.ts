import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
const route = require('./router/Route');
import { getPrismaClient } from './connec/Conn';
import { PrismaClient } from '@prisma/client';

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
const prismaMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const schema = req.query.schema as string;
    
    if (!schema) {
      res.status(400).json({ error: 'Cliente não definido...' });
      return;
    }
  
    req.prisma = getPrismaClient(schema);
    next();
  };
app.use(prismaMiddleware);
app.use(route);

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});