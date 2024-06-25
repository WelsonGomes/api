import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';

dotenv.config();

//Configurar cliente no banco de dados para conexão
export function getPrismaClient(schema: string): PrismaClient {
    const url = process.env.BASE_URL+schema;
    return new PrismaClient({
        datasources: {
            db: {
                url: url
            }
        }
    });
};