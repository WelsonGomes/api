import { PrismaClient } from "@prisma/client";
import { EstadoDTO } from "../model/Interfaces";
import dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function createEstado(estado: EstadoDTO): Promise<{status: number, msg: string}> {
    try {
        await prisma.tbestado.create({data: estado});        
        return {status: 200, msg: 'Novo estado cadastrado com sucesso.'};
    } catch (error) {
        console.log(error);
        return {status: 500, msg: error instanceof Error ? error.message : 'Erro desconhecido'};
    }
}

async function updateEstado(estado: EstadoDTO, id: number): Promise<{status: number, msg: string}> {
    try {
        await prisma.tbestado.update({
            where: {id: id},
            data: estado
        });
        return {status: 200, msg: 'Atualizado os dados do estado.'};
    } catch (error) {
        console.log(error);
        return {status: 500, msg: error instanceof Error ? error.message : 'Erro desconhecido'};
    }
}

export { createEstado, updateEstado };