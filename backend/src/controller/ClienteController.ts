import { PrismaClient } from "@prisma/client";
import { ClienteDTO } from '../model/Interfaces';
import dotenv from 'dotenv';
import { getValidaCpfCnpj } from '../functions/Validacoes';
import { tratamentoError } from "../messaging/Excepitions";

dotenv.config();

async function createCliente(prisma: PrismaClient, cliente: ClienteDTO): Promise<{status: number, msg: string}> {
    try {
        const bCnpjCpf = await getValidaCpfCnpj(cliente.cnpjcpf);
        if(bCnpjCpf){
            try {
                await prisma.tbcliente.create({
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
                return {status: 200, msg: 'Novo cliente cadastrado com sucesso.'};
            } catch (error) {
                if(error instanceof Error){
                    const tratamento = await tratamentoError(error);
                    return {status: tratamento.status, msg: tratamento.msg};
                };
                return {status: 500, msg: 'Houve um erro crítico no sistema'};
            };
        };
        return {status: 400, msg: 'Este CnpjCpf é invalido. Favor verifique.'};
    } catch (error) {
        if(error instanceof Error){
            const tratamento = await tratamentoError(error);
            return {status: tratamento.status, msg: tratamento.msg};
        };
        return {status: 500, msg: 'Houve um erro crítico no sistema'};
    };
};

async function updateCliente(prisma: PrismaClient, cliente: ClienteDTO, id: number): Promise<{status: number, msg: string}> {
    try{
        const bCnpjCpf = await getValidaCpfCnpj(cliente.cnpjcpf);
        if(bCnpjCpf){
            try {
                const response = await prisma.tbcliente.findUnique({ where: { id: id }});
                if(response){
                    await prisma.tbcliente.update({
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
                }
                return {status: 200, msg: 'Novo cliente cadastrado com sucesso.'};
            } catch (error) {
                if(error instanceof Error){
                    const tratamento = await tratamentoError(error);
                    return {status: tratamento.status, msg: tratamento.msg};
                };
                return {status: 500, msg: 'Houve um erro crítico no sistema'};
            };
        };
        return {status: 400, msg: 'Este CnpjCpf é invalido. Favor verifique.'};
    } catch (error) {
        if(error instanceof Error){
            const tratamento = await tratamentoError(error);
            return {status: tratamento.status, msg: tratamento.msg};
        };
        return {status: 500, msg: 'Houve um erro crítico no sistema'};
    };
};

async function deleteCliente(prisma: PrismaClient, id: number): Promise<{status: number, msg: string}> {
    try {
        let status = 0;
        let msg = '';
        await prisma.$transaction(async (prisma) => {
            try {
                const cliente = await prisma.tbcliente.findUnique({ where: { id: id }});
                if(cliente) {
                    await prisma.tbcidade.delete({ where: { id: id }});
                    status = 200;
                    msg = 'Cliente deletado com sucesso.'
                };
                return {status: 400, msg: 'Não foi possivel deletar o cliente.'};
            } catch (error) {
                if(error instanceof Error){
                    const tratamento = await tratamentoError(error);
                    status = tratamento.status;
                    msg = tratamento.msg;
                };
                status = 500;
                msg = 'Houve um erro crítico no sistema';
            };
        });
        return {status: status, msg: msg};
    } catch (error) {
        if(error instanceof Error){
            const tratamento = await tratamentoError(error);
            return {status: tratamento.status, msg: tratamento.msg};
        };
        return {status: 500, msg: 'Houve um erro crítico no sistema'};
    } finally {
        await prisma.$disconnect();
    };
};

export { createCliente, updateCliente, deleteCliente };