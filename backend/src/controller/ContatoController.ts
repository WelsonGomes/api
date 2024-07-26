import { Request, Response } from 'express';
import { tratamentoError } from '../messaging/Excepitions';
import dotenv from 'dotenv';

dotenv.config();

export default class ContratoController {
    static async createContato(req: Request, res: Response){
        try {
            await req.prisma.$transaction(async (prismaTransaction) => {
                return prismaTransaction.tbcontato.create({
                    data: {
                        pessoaid: req.body.pessoaid,
                        telefone: req.body.telefone,
                        celular: req.body.celular,
                        email: req.body.email
                    }
                });
            });
            return res.status(200).json({msg: 'Novo contato cadastrado com sucesso.'});
        } catch (error) {
            const tratamento = await tratamentoError(error);
            return res.status(tratamento.status).json({msg: tratamento.msg});
        } finally {
            await req.prisma.$disconnect();
        };
    };

    static async updateContato(req: Request, res: Response){
        try {
            await req.prisma.$transaction(async (prismaTransaction) => {
                return prismaTransaction.tbcontato.update({
                    where: { id: parseInt(req.query.id as string) },
                    data: {
                        pessoaid: req.body.pessoaid,
                        telefone: req.body.telefone,
                        celular: req.body.celular,
                        email: req.body.email
                    }
                });
            });
            return res.status(200).json({msg: 'Atualização de contato realizado com sucesso'});
        } catch (error) {
            const tratamento = await tratamentoError(error);
            return res.status(tratamento.status).json({msg: tratamento.msg})
        } finally {
            await req.prisma.$disconnect();
        };
    };

    static async deleteContato(req: Request, res: Response) {
        try {
            await req.prisma.$transaction(async (prismaTransaction) => {
                return prismaTransaction.tbcontato.delete({
                    where: { id: parseInt(req.query.id as string) }
                });
            });
            return res.status(200).json({msg: 'Contato deletado da base de dados.'})
        } catch (error) {
            const tratamento = await tratamentoError(error);
            return res.status(tratamento.status).json({msg: tratamento.msg})
        } finally {
            await req.prisma.$disconnect();
        };
    };

    static async selectContato(req: Request, res: Response) {
        try {
            if(req.query.id){
                return res.status(200).json(await req.prisma.tbcontato.findUnique({ 
                    where: { id: parseInt(req.query.id as string) }
                }));
            };
            return res.status(200).json(await req.prisma.tbcontato.findMany());
        } catch (error) {
            const tratamento = await tratamentoError(error);
            return res.status(tratamento.status).json({msg: tratamento.msg})
        } finally {
            await req.prisma.$disconnect();
        };
    };
}