import { PrismaClient } from "@prisma/client";
import { EstadoDTO, reqEstadoDTO } from "../model/Interfaces";
import dotenv from 'dotenv';
import { tratamentoError } from "../messaging/Excepitions";

dotenv.config();

async function createEstado(prisma: PrismaClient, estado: EstadoDTO): Promise<{status: number, msg: string}> {
    try {
        const result = await prisma.$transaction(async (primaTransaction) => {
            await primaTransaction.tbestado.create({data: estado});        
            return {status: 200, msg: 'Novo estado cadastrado com sucesso.'};
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

async function updateEstado(prisma: PrismaClient, estado: EstadoDTO, id: number): Promise<{status: number, msg: string}> {
    try {
        const result = await prisma.$transaction(async (prismaTransaction) => {
            const response = await prismaTransaction.tbestado.update({
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

async function deleteEstado(prisma: PrismaClient, id: number): Promise<{status: number, msg: string}> {
    try {
        const result = prisma.$transaction(async (prismaTransaction) => {
            const estado = await prismaTransaction.tbestado.findUnique({where: { id: id }});
            if(estado){
                await prisma.tbestado.delete({ where: {id: id }});
                return {status: 200, msg: 'Estado deletado com sucesso.'};
            }
            return {status: 500, msg: 'Não foi possivel deletar o estado.'};
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

async function selectEstado(prisma: PrismaClient ): Promise<reqEstadoDTO[]> {
    try {
        const estados = await prisma.tbestado.findMany({orderBy: [{ id: 'asc' }]});
        if(estados){
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
        return [];
    } catch (error) {
        if (error instanceof Error) {
            const tratamento = await tratamentoError(error);
            return [];
        }
        return [];
    } finally {
        await prisma.$disconnect();
    };
};

async function selectEstadoId(prisma: PrismaClient, id: number): Promise<reqEstadoDTO | null> {
    try {
        const estado = await prisma.tbestado.findUnique({ where: { id: id }});
        if(estado){
            const responseDTO: reqEstadoDTO = {
                id: estado.id,
                nome: estado.nome,
                uf: estado.uf,
                pais: estado.pais
            };
            return responseDTO;
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
}

export { createEstado, updateEstado, deleteEstado, selectEstado, selectEstadoId };