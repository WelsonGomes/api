import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';

dotenv.config();

//Configurar cliente no banco de dados para conexão
export function getPrismaClient(schema: string): PrismaClient {
    console.log('Configurando conexão do prisma');
    const dbhost = process.env.DATABASE_HOST;
    const dbname = process.env.DATABASE_NAME;
    const dbport = process.env.DATABASE_PORT;
    const dbuser = process.env.DATABASE_USER;
    const dbpassword = process.env.DATABASE_PASSWORD;
    const url = `postgresql://${dbuser}:${dbpassword}@${dbhost}:${dbport}/${dbname}?schema=${schema}`
    console.log('Cliente para comunicação ' + schema);
    return new PrismaClient({
        datasources: {
            db: {
                url: url
            }
        }
    });
};