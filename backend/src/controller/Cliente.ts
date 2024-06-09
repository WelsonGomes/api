import { PrismaClient } from "@prisma/client";
import { EstadoDTO } from "../model/Interfaces";
import dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function createEstado(estado: EstadoDTO): Promise<{status: number, msg: string}> {
    try {
        let novoEstado = await prisma.tbestado.create({
            data: {
                nome: estado.nome,
                uf: estado.uf,
                pais: estado.pais
            }
        });        
        return {status: 200, msg: 'Novo estado cadastrado com sucesso.'};
    } catch (error) {
        console.log(error);
        return {status: 500, msg: error instanceof Error ? error.message : 'Erro desconhecido'};
    }
}

export { createEstado };