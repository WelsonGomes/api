import { PrismaClient } from "@prisma/client";
import { ClienteDTO } from '../model/Interfaces';
import dotenv from 'dotenv';
import { getValidaCpfCnpj } from '../functions/Validacoes';
import { tratamentoError } from "../messaging/Excepitions";

dotenv.config();

async function createCliente(prisma: PrismaClient, cliente: ClienteDTO): Promise<{status: number, msg: string}> {
    try {
        const bCnpjCpf = await getValidaCpfCnpj(cliente.cnpjcpf);
        if (!bCnpjCpf) {
            return { status: 400, msg: 'Este CnpjCpf é inválido. Favor verifique.' };
        }

        const response = await prisma.$transaction(async (prismaTransaction) => {
            await prismaTransaction.tbcliente.create({
                data: {
                    cnpjcpf: cliente.cnpjcpf.replace(/[^\d]+/g, ''),
                    razaosocial: cliente.razaosocial,
                    fantasia: cliente.fantasia,
                    datacriacao: new Date(cliente.datacriacao),
                    contratoid: cliente.contratoid,
                    responsavel: cliente.responsavel,
                    situacao: cliente.situacao,
                    email: cliente.email,
                    telefone: cliente.telefone,
                    celular: cliente.celular,
                    estadoid: cliente.estadoid,
                    cidadeid: cliente.cidadeid,
                    cep: cliente.cep,
                    logradouro: cliente.logradouro,
                    numero: cliente.numero,
                    bairro: cliente.bairro,
                    complemento: cliente.complemento,
                    datacadastro: new Date(cliente.datacadastro)
                }
            });
            return { status: 200, msg: 'Novo cliente cadastrado com sucesso.' };
        });

        return response;
    } catch (error) {
        if (error instanceof Error) {
            const tratamento = await tratamentoError(error);
            return { status: tratamento.status, msg: tratamento.msg };
        }
        return { status: 500, msg: 'Houve um erro crítico no sistema' };
    } finally {
        await prisma.$disconnect();
    }
};

async function updateCliente(prisma: PrismaClient, cliente: ClienteDTO, id: number): Promise<{status: number, msg: string}> {
    try {
        const bCnpjCpf = await getValidaCpfCnpj(cliente.cnpjcpf);
        if (!bCnpjCpf) {
            return { status: 400, msg: 'Este CnpjCpf é inválido. Favor verifique.' };
        }

        const response = await prisma.$transaction(async (prismaTransaction) => {
            const existingCliente = await prismaTransaction.tbcliente.findUnique({ where: { id: id } });
            if (!existingCliente) {
                return { status: 400, msg: 'Este cliente não foi encontrado. Por favor verifique.' };
            }

            await prismaTransaction.tbcliente.update({
                where: { id: id },
                data: {
                    cnpjcpf: cliente.cnpjcpf.replace(/[^\d]+/g, ''),
                    razaosocial: cliente.razaosocial,
                    fantasia: cliente.fantasia,
                    datacriacao: new Date(cliente.datacriacao),
                    contratoid: cliente.contratoid,
                    responsavel: cliente.responsavel,
                    situacao: cliente.situacao,
                    email: cliente.email,
                    telefone: cliente.telefone,
                    celular: cliente.celular,
                    estadoid: cliente.estadoid,
                    cidadeid: cliente.cidadeid,
                    cep: cliente.cep,
                    logradouro: cliente.logradouro,
                    numero: cliente.numero,
                    bairro: cliente.bairro,
                    complemento: cliente.complemento,
                    datacadastro: new Date(cliente.datacadastro)
                }
            });

            return { status: 200, msg: 'Cliente atualizado com sucesso.' };
        });

        return response;
    } catch (error) {
        if (error instanceof Error) {
            const tratamento = await tratamentoError(error);
            return { status: tratamento.status, msg: tratamento.msg };
        }
        return { status: 500, msg: 'Houve um erro crítico no sistema' };
    } finally {
        await prisma.$disconnect();
    }
};

async function deleteCliente(prisma: PrismaClient, id: number): Promise<{status: number, msg: string}> {
    try {
        const result = await prisma.$transaction(async (prismaTransaction) => {
            const cliente = await prismaTransaction.tbcliente.findUnique({ where: { id: id } });
            if (cliente) {
                await prismaTransaction.tbcliente.delete({ where: { id: id }}); 
                return { status: 200, msg: 'Cliente deletado com sucesso.' };
            } else {
                return { status: 400, msg: 'Não foi possível encontrar o cliente.' };
            }
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

export { createCliente, updateCliente, deleteCliente };