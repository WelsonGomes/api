import { PrismaClient } from "@prisma/client";
import { CidadeDTO, PaginatedResponse, reqCidadeDTO } from "../model/Interfaces";
import dotenv from 'dotenv';
import { tratamentoError } from "../messaging/Excepitions";

dotenv.config();

async function createCidade(prisma: PrismaClient, cidade: CidadeDTO): Promise<{status: number, msg: string}> {
    try {
        const result = await prisma.$transaction(async (prismaTransaction) => {
            await prisma.tbcidade.create({data: cidade});
            return {status: 200, msg: 'Nova cidade cadastrada com sucesso.'};
        });
        return result;
    } catch (error) {
        if (error instanceof Error) {
            const tratamento = await tratamentoError(error);
            return { status: tratamento.status, msg: tratamento.msg };
        }
        return { status: 500, msg: 'Houve um erro crítico no sistema' };
    } finally {
        await prisma.$disconnect();
    };
};

async function updateCidade(prisma: PrismaClient, cidade: CidadeDTO, id: number): Promise<{status: number, msg: string}> {
    try {
        const result = await prisma.$transaction(async (prismaTransaction) => {
            const response = await prisma.tbcidade.update({
                where: {id: id},
                data: cidade
            });
            return {status: 200, msg: 'Atualização de cidade com sucesso.'};
        });
        return result;
    } catch (error) {
        if (error instanceof Error) {
            const tratamento = await tratamentoError(error);
            return { status: tratamento.status, msg: tratamento.msg };
        }
        return { status: 500, msg: 'Houve um erro crítico no sistema' };
    } finally {
        await prisma.$disconnect();
    };
};

async function deleteCidade(prisma: PrismaClient, id: number): Promise<{status: number, msg: string}> {
    try {
        const result = await prisma.$transaction(async (prismaTransaction) => {
            const response = await prisma.tbcidade.delete({where: {id: id}});
            if(response){
                return {status: 200, msg: 'Cidade deletada com sucesso.'};
            }
            return {status: 400, msg: 'Houve um erro ao deletar a cidade.'};
        });
        return result;
    } catch (error) {
        if (error instanceof Error) {
            const tratamento = await tratamentoError(error);
            return { status: tratamento.status, msg: tratamento.msg };
        }
        return { status: 500, msg: 'Houve um erro crítico no sistema' };
    } finally {
        await prisma.$disconnect();
    };
};

async function selectCidade(prisma: PrismaClient, page: number = 1, pageSize: number = 10): Promise<PaginatedResponse<reqCidadeDTO>> {
    try {
        const skip = (page - 1) * pageSize;
        const take = pageSize;
        const total = await prisma.tbcidade.count();
        const response = await prisma.tbcidade.findMany({
            skip: skip,
            take: take,
            orderBy: { nome: 'asc' },
            include: { estado: true }
        });
        if(response){
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
            return { data: reqcidadeDTO, total: total, page: page, pageSize: pageSize };
        };
        return  { data: [], total: 0, page: page, pageSize: pageSize };
    } catch (error) {
        if (error instanceof Error) {
            const tratamento = await tratamentoError(error);
            return  { data: [], total: 0, page: page, pageSize: pageSize };
        }
        return  {  data: [], total: 0, page: page, pageSize: pageSize };
    } finally {
        await prisma.$disconnect();
    };
};

async function selectCidadeId(prisma: PrismaClient, id: number): Promise<reqCidadeDTO | null> {
    try {
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
    } catch (error) {
        if (error instanceof Error) {
            const tratamento = await tratamentoError(error);
            return null;
        }
        return null;
    } finally {
        await prisma.$disconnect();
    };
};

export { createCidade, updateCidade, deleteCidade, selectCidade, selectCidadeId };