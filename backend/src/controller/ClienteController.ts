import { PrismaClient } from "@prisma/client";
import { ClienteDTO } from '../model/Interfaces';
import dotenv from 'dotenv';
import { getValidaCpfCnpj } from '../functions/Validacoes';

dotenv.config();

async function createCliente(prisma: PrismaClient, cliente: ClienteDTO): Promise<{status: number, msg: string}> {
    try {
        const bCnpjCpf = await getValidaCpfCnpj(cliente.cnpjcpf);
        if(bCnpjCpf){
            await prisma.tbcliente.create({
                data: {
                    cnpjcpf: cliente.cnpjcpf,
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
            return {status: 200, msg: 'Novo cliente cadastrado com sucesso.'};
        };
        return {status: 400, msg: 'Este CnpjCpf é invalido. Favor verifique.'};
    } catch (error) {
        console.log(error);
        return {status: 500, msg: error instanceof Error ? error.message : 'Erro desconhecido'};
    }
};

async function updateCliente(prisma: PrismaClient, cliente: ClienteDTO, id: number): Promise<{status: number, msg: string}> {
    const bCnpjCpf = await getValidaCpfCnpj(cliente.cnpjcpf);
    if(bCnpjCpf){
        try {
            const response = await prisma.tbcliente.findUnique({ where: { id: id }});
            if(response){
                await prisma.tbcliente.update({
                    where: { id: id },
                    data: {
                        cnpjcpf: cliente.cnpjcpf,
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
            }
            return {status: 200, msg: 'Novo cliente cadastrado com sucesso.'};
        } catch (error) {
            console.log(error);
            return {status: 500, msg: error instanceof Error ? error.message : 'Erro desconhecido'};
        }
    };
    return {status: 400, msg: 'Este CnpjCpf é invalido. Favor verifique.'};
};

export { createCliente, updateCliente };