import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { getPrismaClient } from './connec/Conn';
dotenv.config();

function prismaMiddleware(req: Request, res: Response, next: NextFunction) {
    console.log('verificando cliente na requisição');
    const schema = req.query.schema as string;
    console.log('Cliente' + schema);
    if (!schema) {
      return res.status(400).json({ error: 'Cliente não definido...' });
    };
    console.log('Chamando comunicação do prisma.');
    req.prisma = getPrismaClient(schema);
    next();
}

export { prismaMiddleware };