import { PrismaClient } from "@prisma/client";
import { ClienteDTO, reqClienteDTO, PaginatedResponse } from '../model/Interfaces';
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
                    datacadastro: new Date()
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
    };
};

async function updateCliente(prisma: PrismaClient, cliente: ClienteDTO, id: number): Promise<{status: number, msg: string}> {
    try {
        const bCnpjCpf = await getValidaCpfCnpj(cliente.cnpjcpf);
        if (!bCnpjCpf) {
            return { status: 400, msg: 'Este CnpjCpf é inválido. Favor verifique.' };
        }

        const response = await prisma.$transaction(async (prismaTransaction) => {
            await prismaTransaction.tbcliente.update({
                where: { id: id },
                data: {
                    cnpjcpf: cliente.cnpjcpf.replace(/[^\d]+/g, ''),
                    razaosocial: cliente.razaosocial,
                    fantasia: cliente.fantasia,
                    datacriacao: new Date(cliente.datacriacao),
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
                    complemento: cliente.complemento
                }
            });

            return { status: 200, msg: 'Cliente atualizado com sucesso.' };
        });

        return response;
    } catch (error) {
        const tratamento = await tratamentoError(error);
        return tratamento;
    } finally {
        await prisma.$disconnect();
    }
};

async function deleteCliente(prisma: PrismaClient, id: number): Promise<{status: number, msg: string}> {
    try {
        const result = await prisma.$transaction(async (prismaTransaction) => {
            const response = await prismaTransaction.tbcontrato.findUnique({
                where: {
                    id: id,
                    status: 1
                }
            });
            if(response){
                return { status: 400, msg: 'Não é possível excluir um cliente com contrato ativo.' };
            };
            await prismaTransaction.tbcliente.update({ 
                where: { id: id, situacao: 1 },
                data: {
                    situacao: 0
                }
            }); 
            return { status: 200, msg: 'Cliente deletado com sucesso.' };
        });
        return result;
    } catch (error) {
        const tratamento = await tratamentoError(error);
        return tratamento;
    } finally {
        await prisma.$disconnect();
    };
};

async function selectCliente(prisma: PrismaClient, page: number = 1, pageSize: number = 10): Promise<PaginatedResponse<reqClienteDTO>> {
    try {
        const skip = (page - 1) * pageSize;
        const take = pageSize;
        const total = await prisma.tbcliente.count();
        const response = await prisma.tbcliente.findMany({
            skip: skip,
            take: take,
            orderBy: { razaosocial: 'asc' },
            include: { estado: true, cidade: true }
        });
        if (response) {
            const clientes: reqClienteDTO[] = response.map((c) => {
                return {
                    id: c.id,
                    cnpjcpf: c.cnpjcpf,
                    razaosocial: c.razaosocial,
                    fantasia: c.fantasia,
                    datacriacao: c.datacriacao,
                    responsavel: c.responsavel,
                    situacao: c.situacao,
                    email: c.email,
                    telefone: c.telefone,
                    celular: c.celular,
                    estadoid: c.estadoid,
                    cidadeid: c.cidadeid,
                    cep: c.cep,
                    logradouro: c.logradouro,
                    numero: c.numero,
                    bairro: c.bairro,
                    complemento: c.complemento,
                    datacadastro: c.datacadastro,
                    cidade: {
                        id: c.cidade.id,
                        nome: c.cidade.nome,
                        estadoid: c.cidade.estadoid,
                        codigoibge: c.cidade.codigoibge,
                        estado: {
                            id: c.estado.id,
                            nome: c.estado.nome,
                            uf: c.estado.uf,
                            pais: c.estado.pais
                        }
                    }
                }
            });
            return  { data: clientes, total: total, page: page, pageSize: pageSize };
        }
        return  { data: [], total: 0, page: page, pageSize: pageSize }; 
    } catch (error) {
        return  { data: [], total: 0, page: page, pageSize: pageSize }; 
    } finally {
        await prisma.$disconnect();
    }
}

async function selectClienteId(prisma: PrismaClient, id: number): Promise<reqClienteDTO | null> {
    try {
        const response = await prisma.tbcliente.findUnique({ 
            where: { id: id },
            include: { estado: true, cidade: true }
        });
        if(!response) {
            return null;
        }
        const cliente: reqClienteDTO = {
            id: response.id,
            cnpjcpf: response.cnpjcpf,
            razaosocial: response.razaosocial,
            fantasia: response.fantasia,
            datacriacao: response.datacriacao,
            responsavel: response.responsavel,
            situacao: response.situacao,
            email: response.email,
            telefone: response.telefone,
            celular: response.celular,
            estadoid: response.estadoid,
            cidadeid: response.cidadeid,
            cep: response.cep,
            logradouro: response.logradouro,
            numero: response.numero,
            bairro: response.bairro,
            complemento: response.complemento,
            datacadastro: response.datacadastro,
            cidade: {
                id: response.cidade.id,
                nome: response.cidade.nome,
                estadoid: response.cidade.estadoid,
                codigoibge: response.cidade.codigoibge,
                estado: {
                    id: response.estado.id,
                    nome: response.estado.nome,
                    uf: response.estado.uf,
                    pais: response.estado.pais
                }
            }
        }
        return cliente;
    } catch (error) {
        return null;
    } finally {
        await prisma.$disconnect();
    }
};

export { createCliente, updateCliente, deleteCliente, selectCliente, selectClienteId };