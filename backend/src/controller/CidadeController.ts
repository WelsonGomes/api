import { PrismaClient } from "@prisma/client";
import { CidadeDTO, reqCidadeDTO } from "../model/Interfaces";
import dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function createCidade(cidade: CidadeDTO): Promise<{status: number, msg: string}> {
    try {
        await prisma.tbcidade.create({data: cidade});
        return {status: 200, msg: 'Nova cidade cadastrada com sucesso.'};
    } catch (error) {
        console.log(error);
        return {status: 500, msg: error instanceof Error ? error.message : 'Erro desconhecido.'};
    }
};

async function updateCidade(cidade: CidadeDTO, id: number): Promise<{status: number, msg: string}> {
    try {
        const response = await prisma.tbcidade.update({
            where: {id: id},
            data: cidade
        });
        return {status: 200, msg: 'Atualização de cidade com sucesso.'};
    } catch (error) {
        console.log(error);
        return {status: 500, msg: error instanceof Error ? error.message : 'Erro desconhecido.'};
    }
};

async function deleteCidade(id: number): Promise<{status: number, msg: string}> {
    try {
        const response = await prisma.tbcidade.delete({where: {id: id}});
        if(response){
            return {status: 200, msg: 'Cidade deletada com sucesso.'};
        }
        return {status: 500, msg: 'Houve um erro ao deletar a cidade.'};
    } catch (error) {
        console.log(error);
        return {status: 500, msg: error instanceof Error ? error.message : 'Erro desconhecido.'};
    }
};

async function selectCidade(): Promise<reqCidadeDTO[]> {
    const response = await prisma.tbcidade.findMany({
        orderBy: { nome: 'asc' },
        include: { estado: true }
    });
    const reqcidadeDTO: reqCidadeDTO[] = response.map((c) => {
        return {
            id: c.id,
            nome: c.nome,
            estadoid: c.estadoid,
            codigoibge: c.codigoibge,
            estado: {
                id: c.estado.id,
                nome: c.estado.nome,
                uf: c.estado.uf,
                pais: c.estado.pais
            }
        };
    });
    return reqcidadeDTO;
};

async function selectCidadeId(id: number): Promise<reqCidadeDTO | null> {
    const response = await prisma.tbcidade.findUnique({
        where: { id: id },
        include: { estado: true }
    });
    if(response){
        const reqcidadeDTO: reqCidadeDTO = {
            id: response.id,
            nome: response.nome,
            estadoid: response.estadoid,
            codigoibge: response.codigoibge,
            estado: {
                id: response.estado.id,
                nome: response.estado.nome,
                uf: response.estado.uf,
                pais: response.estado.pais
            }
        };
        return reqcidadeDTO;
    };
    return null;
};

export { createCidade, updateCidade, deleteCidade, selectCidade, selectCidadeId };