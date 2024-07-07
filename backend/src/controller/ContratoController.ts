import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { tratamentoError } from "../messaging/Excepitions";
import { reqContratoDTO } from '../model/Interfaces';

dotenv.config();

export default class ContratoController {
    static async createContrato(req: Request, res: Response) {
        try {
            const result = await req.prisma.$transaction(async (prismaTransaction) => {
                await prismaTransaction.tbcontato.create({ data: req.body });
                return res.status(200).json({msg: 'Novo contrato cadastrado com sucesso.'});
            });
            return result;
        } catch (error) {
            if(error instanceof Error){
                const tratamento = await tratamentoError(error);
                return res.status(tratamento.status).json({msg: tratamento.msg});
            };
            return res.status(500).json({msg: 'Houve uma falha crítica no sistema. Por favor, entre em contato com um especialista.'});
        } finally {
            await req.prisma.$disconnect();
        };
    };

    static async updateContrato(req:Request, res: Response) {
        try {
            const result = req.prisma.$transaction(async (prismaTransaction) => {
                await prismaTransaction.tbcontrato.update({ where: { id: parseInt(req.query.id as string) }, data: req.body });
                return res.status(200).json({msg: 'Contrato alterado com sucesso.'});
            });
            return result;
        } catch (error) {
            if(error instanceof Error){
                const tratamento = await tratamentoError(error);
                return res.status(tratamento.status).json({msg: tratamento.msg});
            };
            return res.status(500).json({msg: 'Houve uma falha crítica no sistema. Por favor, entre em contato com um especialista.'});
        } finally {
            await req.prisma.$disconnect();
        };
    };

    static async deleteContrato(req: Request, res: Response) {
        try {
            const result = await req.prisma.$transaction(async (prismaTransaction) => {
                await prismaTransaction.tbcontrato.update({ where: { id: parseInt(req.query.id as string) }, data: { status: 0 }});
                return res.status(200).json({msg: 'Contrado deletado com sucesso.'});
            });
            return result;
        } catch (error) {
            if(error instanceof Error){
                const tratamento = await tratamentoError(error);
                return res.status(tratamento.status).json({msg: tratamento.msg});
            };
            return res.status(500).json({msg: 'Houve uma falha crítica no sistema. Por favor, entre em contato com um especialista.'});
        } finally {
            await req.prisma.$disconnect();
        };
    };

    static async selectContrato(req: Request, res: Response) {
        try {
            if(parseInt(req.query.id as string) > 0) {
                const response = await req.prisma.tbcontrato.findUnique({ where: { id: parseInt(req.query.id as string) }});
                return res.status(200).json(response);
            };
            const total = await req.prisma.tbcontrato.count();
            const response = await req.prisma.tbcontrato.findMany({
                skip: parseInt(req.query.skip as string),
                take: parseInt(req.query.take as string),
                orderBy: { dtinicio: 'asc' },
                include: { cliente: true }
            });
            if(!response){
                return res.status(200).json({data: [], total: 0, page: req.query.page as string, pageSize: req.query.pageSize as string});
            };
            const result: reqContratoDTO[] = response.map((dados) => {
                return {
                    id: dados.id,
                    contrato: dados.contrato,
                    clienteid: dados.clienteid,
                    dtinicio: dados.dtinicio,
                    qtdmeses: dados.qtdmeses,
                    dttermino: dados.dttermino,
                    valor: dados.valor,
                    valormensal: dados.valormensal,
                    responsavel: dados.responsavel,
                    dtcadastro: dados.dtcadastro,
                    cedente: dados.cedente,
                    cessionaria: dados.cessionaria,
                    descricao: dados.descricao,
                    status: dados.status,
                    dtassinatura: dados.dtassinatura,
                    dtatualizacao: dados.dtatualizacao,
                    cliente: {
                        id: dados.cliente.id,
                        cnpjcpf: dados.cliente.cnpjcpf,
                        razaosocial: dados.cliente.razaosocial,
                        fantasia: dados.cliente.fantasia,
                        datacriacao: dados.cliente.datacriacao,
                        responsavel: dados.cliente.responsavel,
                        situacao: dados.cliente.situacao,
                        email: dados.cliente.email,
                        telefone: dados.cliente.telefone,
                        celular: dados.cliente.celular,
                        estadoid: dados.cliente.estadoid,
                        cidadeid: dados.cliente.cidadeid,
                        cep: dados.cliente.cep,
                        logradouro: dados.cliente.logradouro,
                        numero: dados.cliente.numero,
                        bairro: dados.cliente.bairro,
                        complemento: dados.cliente.complemento,
                        datacadastro: dados.cliente.datacadastro,
                        cidade: null
                    }
                };
            });
            return { data: result, total: total, page: req.query.page as string, pageSize: req.query.pageSize as string };
        } catch (error) {
            if(error instanceof Error){
                const tratamento = await tratamentoError(error);
                return res.status(tratamento.status).json({msg: tratamento.msg});
            };
            return res.status(500).json({msg: 'Houve uma falha crítica no sistema. Por favor, entre em contato com um especialista.'});
        } finally {
            await req.prisma.$disconnect();
        };
    };
};