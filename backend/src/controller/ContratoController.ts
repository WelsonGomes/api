import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { tratamentoError } from "../messaging/Excepitions";
import { reqContratoDTO } from '../model/Interfaces';

dotenv.config();

export default class ContratoController {
    static async createContrato(req: Request, res: Response) {
        try {
            await req.prisma.$transaction(async (prismaTransaction) => {
                return prismaTransaction.tbcontrato.create({ 
                    data: {
                        contrato: req.body.contrato,
                        clienteid: req.body.clienteid,
                        dtinicio: new Date(req.body.dtinicio),
                        qtdmeses: req.body.qtdmeses,
                        dttermino: new Date(req.body.dttermino),
                        valor: req.body.valor,
                        valormensal: req.body.valormensal,
                        responsavel: req.body.responsavel,
                        dtcadastro: new Date(req.body.dtcadastro),
                        cedente: req.body.cedente,
                        cessionaria: req.body.cessionaria,
                        descricao: req.body.descricao,
                        status: req.body.status,
                        dtassinatura: new Date(req.body.dtassinatura)
                    }
                });
                
            });
            return res.status(200).json({msg: 'Novo contrato cadastrado com sucesso.'});
        } catch (error) {
            const tratamento = await tratamentoError(error);
            return res.status(tratamento.status).json({msg: tratamento.msg});
        } finally {
            await req.prisma.$disconnect();
        };
    };

    static async updateContrato(req:Request, res: Response) {
        try {
            await req.prisma.$transaction(async (prismaTransaction) => {
                return prismaTransaction.tbcontrato.update({ 
                    where: { 
                        id: parseInt(req.query.id as string) 
                    }, 
                    data: {
                        contrato: req.body.contrato,
                        clienteid: req.body.clienteid,
                        dtinicio: new Date(req.body.dtinicio),
                        qtdmeses: req.body.qtdmeses,
                        dttermino: new Date(req.body.dttermino),
                        valor: req.body.valor,
                        valormensal: req.body.valormensal,
                        responsavel: req.body.responsavel,
                        dtcadastro: new Date(req.body.dtcadastro),
                        cedente: req.body.cedente,
                        cessionaria: req.body.cessionaria,
                        descricao: req.body.descricao,
                        status: req.body.status,
                        dtassinatura: new Date(req.body.dtassinatura)
                    }
                });
            });
            return res.status(200).json({msg: 'Contrato alterado com sucesso.'});
        } catch (error) {
            const tratamento = await tratamentoError(error);
            return res.status(tratamento.status).json({msg: tratamento.msg});
        } finally {
            await req.prisma.$disconnect();
        };
    };

    static async deleteContrato(req: Request, res: Response) {
        try {
            await req.prisma.$transaction(async (prismaTransaction) => {
                return prismaTransaction.tbcontrato.update({ 
                    where: { 
                        id: parseInt(req.query.id as string), 
                        clienteid: parseInt(req.query.cliente as string),
                        status: 1
                    }, 
                    data: { status: 0 }
                });
            });
            return res.status(200).json({msg: 'Contrado deletado com sucesso.'});
        } catch (error) {
            const tratamento = await tratamentoError(error);
            return res.status(tratamento.status).json({msg: tratamento.msg});
        } finally {
            await req.prisma.$disconnect();
        };
    };

    static async selectContrato(req: Request, res: Response) {
        try {
            let id = parseInt(req.query.id as string,10);

            if(id > 0) {
                const response = await req.prisma.tbcontrato.findUnique({ 
                    where: { 
                        id: parseInt(req.query.id as string),
                        status: 1
                    }
                });
                return res.status(200).json({ 
                    page: req.query.page as string, 
                    pageSize: req.query.pageSize as string, 
                    data: response 
                });
            };

            let skip = parseInt(req.query.page as string,10);
            let take = parseInt(req.query.pageSize as string,10);
            const total = await req.prisma.tbcontrato.count({ where: { status: 1 }});
            skip = (skip - 1) * take;
            const response = await req.prisma.tbcontrato.findMany({
                where: {status: 1 },
                skip: skip,
                take: take,
                orderBy: { dtinicio: 'asc' },
                include: { 
                    cliente: { 
                        include: { 
                            cidade: {
                                include: { estado: true } 
                            } 
                        } 
                    } 
                }
            });
            if(!response.length){
                return res.status(200).json({
                    total: 0, 
                    page: req.query.page as string, 
                    pageSize: req.query.pageSize as string, 
                    data: []
                });
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
                        cidade: {
                            id: dados.cliente.cidade.id,
                            nome: dados.cliente.cidade.nome,
                            estadoid: dados.cliente.cidade.estadoid,
                            codigoibge: dados.cliente.cidade.codigoibge,
                            estado: {
                                id: dados.cliente.cidade.estado.id,
                                nome: dados.cliente.cidade.estado.nome,
                                uf: dados.cliente.cidade.estado.uf,
                                pais: dados.cliente.cidade.estado.pais
                            }
                        }
                    }
                };
            });
            return res.status(200).json({
                total: total, 
                page: req.query.page as string, 
                pageSize: req.query.pageSize as string, 
                data: result
            });
        } catch (error) {
            const tratamento = await tratamentoError(error);
            return res.status(tratamento.status).json({msg: tratamento.msg});
        } finally {
            await req.prisma.$disconnect();
        };
    };
};