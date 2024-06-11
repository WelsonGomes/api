import { PrismaClient } from "@prisma/client";
import { ClienteDTO } from '../model/Interfaces';
import dotenv from 'dotenv';

dotenv.config();

async function createCliente(prisma: PrismaClient, cliente: ClienteDTO): Promise<{status: number, msg: string}> {
    try {
        await prisma.tbcliente.create({
            data: {
                cnpjcpf: cliente.cnpjcpf,
                razaosocial: cliente.razaosocial,
                fantasia: cliente.fantasia,
                datacriacao: new Date(cliente.datacriacao), // Convertendo string para Date
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
                datacadastro: new Date(cliente.datacadastro) // Convertendo string para Date
              }
        });
        return {status: 200, msg: 'Novo cliente cadastrado com sucesso.'};
    } catch (error) {
        console.log(error);
        return {status: 500, msg: error instanceof Error ? error.message : 'Erro desconhecido'};
    }
}

export { createCliente };