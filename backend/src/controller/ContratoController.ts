import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';
import { ContratoDTO } from "../model/Interfaces";
import { tratamentoError } from "../messaging/Excepitions";

dotenv.config();

async function createContrato(prisma: PrismaClient, contrato: ContratoDTO): Promise<{status: number, msg: string}> {
    try {
        const result = await prisma.$transaction(async (prismaTransaction) => {
            await prismaTransaction.tbcontrato.create({ data: contrato });
            return {status: 200, msg: 'Novo contrato cadastrado com sucesso.'};
        });
        return result;
    } catch (error) {
        if(error instanceof Error){
            const tratamento = await tratamentoError(error);
            return {status: tratamento.status, msg: tratamento.msg};
        };
        return {status: 500, msg: 'Houve uma falha crítica no sistema. Por favor, entre em contato com um especialista.'}
    } finally {
        await prisma.$disconnect();
    };
};

export { createContrato }