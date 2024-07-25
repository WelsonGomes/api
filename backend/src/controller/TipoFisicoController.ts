import { Request, response, Response } from 'express';
import { tratamentoError } from "../messaging/Excepitions";
import dotenv from 'dotenv';

dotenv.config();

export default class TipoFisicoController{
    static async createTipofisico(req: Request, res: Response){
        try {
            await req.prisma.$transaction(async (prismaTransaction) => {
                return prismaTransaction.tbtipofisico.create({
                    data: {
                        descricao: req.body.descricao
                    }
                });
            });
            return res.status(200).json({msg: 'Novo tipo fisico cadastrado com sucesso.'});
        } catch (error) {
            const tratamento = await tratamentoError(error);
            return res.status(tratamento.status).json({msg: tratamento.msg});
        } finally {
            await req.prisma.$disconnect();
        };
    };

    static async updateTipofisico(req: Request, res: Response){
        try {
            await req.prisma.$transaction(async (prismaTransaction) => {
                return prismaTransaction.tbtipofisico.update({
                    where: { id: parseInt(req.query.id as string) },
                    data: {
                        descricao: req.body.descricao
                    }
                });
            });
            return res.status(200).json({msg: 'Tipo fisico atualizado com sucesso.'});
        } catch (error) {
            const tratamento = await tratamentoError(error);
            return res.status(tratamento.status).json({msg: tratamento.msg});
        } finally {
            await req.prisma.$disconnect();
        };
    };

    static async deleteTipofisico(req: Request, res: Response){
        try {
            await req.prisma.$transaction(async (prismaTransaction) => {
                return prismaTransaction.tbtipofisico.delete({
                    where: { id: parseInt(req.query.id as string) }
                });
            });
            return res.status(200).json({msg: 'Tipo fisico deletado com sucesso.'});
        } catch (error) {
            const tratamento = await tratamentoError(error);
            return res.status(tratamento.status).json({msg: tratamento.msg});
        } finally {
            await req.prisma.$disconnect();
        };
    };

    static async selectTipofisico(req: Request, res: Response){
        try {
            if(req.query.id){
                const response = await req.prisma.tbtipofisico.findUnique({ where: { id: parseInt(req.query.id as string) }});
                return res.status(200).json(response);
            };
            return res.status(200).json(await req.prisma.tbtipofisico.findMany());
        } catch (error) {
            const tratamento = await tratamentoError(error);
            return res.status(tratamento.status).json({msg: tratamento.msg});
        };
    };
};