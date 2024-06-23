import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { getPrismaClient } from './connec/Conn';
dotenv.config();

function prismaMiddleware(req: Request, res: Response, next: NextFunction) {
    const schema = req.query.schema as string;
    
    if (!schema) {
      res.status(400).json({ error: 'Cliente não definido...' });
      return;
    }
  
    req.prisma = getPrismaClient(schema);
    next();
}

export { prismaMiddleware };