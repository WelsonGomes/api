import { PrismaClient } from "@prisma/client";
import { EstadoDTO, reqEstadoDTO } from "../model/Interfaces";
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
    };
};

async function updateEstado(estado: EstadoDTO, id: number): Promise<{status: number, msg: string}> {
    try {
        const response = await prisma.tbestado.update({
            where: { id: id },
            data: {
                nome: estado.nome,
                uf: estado.uf,
                pais: estado.pais
            }
        });
        if (response) {
            return {status: 200, msg: 'Atualizado os dados do estado.'};
        } 
        return {status: 500, msg: 'Houve uma falha ao alterar o estado.'};
    } catch (error) {
        console.log(error);
        return {status: 500, msg: error instanceof Error ? error.message : 'Erro desconhecido'};
    };
};

async function deleteEstado(id: number): Promise<{status: number, msg: string}> {
    try {
        const estado = await prisma.tbestado.findUnique({where: { id: id }});
        if(estado){
            await prisma.tbestado.delete({ where: {id: id }});
            return {status: 200, msg: 'Estado deletado com sucesso.'};
        }
        return {status: 500, msg: 'Não foi possivel deletar o estado.'};
    } catch (error) {
        console.log(error);
        return {status: 500, msg: error instanceof Error ? error.message : 'Erro desconhecido'};
    };
};

async function selectEstado(): Promise<reqEstadoDTO[]> {
    const estados = await prisma.tbestado.findMany({orderBy: [{ id: 'asc' }]});
    const reqestadosDTO: reqEstadoDTO[] = estados.map((e) => {
        return {
            id: e.id,
            nome: e.nome,
            uf: e.uf,
            pais: e.pais
        };
    });
    return reqestadosDTO;
};

async function selectEstadoId(id: number): Promise<reqEstadoDTO | null> {
    const estado = await prisma.tbestado.findUnique({ where: { id: id }});
    if(estado){
        const responseDTO: reqEstadoDTO = {
            id: estado.id,
            nome: estado.nome,
            uf: estado.uf,
            pais: estado.pais
        };
        return responseDTO;
    }
    return null;
}

export { createEstado, updateEstado, deleteEstado, selectEstado, selectEstadoId };