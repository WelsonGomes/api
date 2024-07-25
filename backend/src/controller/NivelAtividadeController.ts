import { Request, response, Response } from 'express';
import { tratamentoError } from "../messaging/Excepitions";
import dotenv from 'dotenv';

dotenv.config();

export default class NivelAtividadeController{
    static async createNivelatividade(req: Request, res: Response){
        try {
            await req.prisma.$transaction(async (prismaTransaction) => {
                return prismaTransaction.tbnivelatividade.create({
                    data: {
                        descricao: req.body.descricao
                    }
                });
            });
            return res.status(200).json({msg: 'Novo nível de atividade cadastrado com sucesso.'});
        } catch (error) {
            const tratamento = await tratamentoError(error);
            return res.status(tratamento.status).json({msg: tratamento.msg});
        } finally {
            await req.prisma.$disconnect();
        };
    };

    static async updateNivelatividade(req: Request, res: Response){
        try {
            await req.prisma.$transaction(async (prismaTransaction) => {
                return prismaTransaction.tbnivelatividade.update({
                    where: { id: parseInt(req.query.id as string) },
                    data: {
                        descricao: req.body.descricao
                    }
                });
            });
            return res.status(200).json({msg: 'Nível de atividade atualizado com sucesso.'});
        } catch (error) {
            const tratamento = await tratamentoError(error);
            return res.status(tratamento.status).json({msg: tratamento.msg});
        } finally {
            await req.prisma.$disconnect();
        };
    };

    static async deleteNivelatividade(req: Request, res: Response){
        try {
            await req.prisma.$transaction(async (prismaTransaction) => {
                return prismaTransaction.tbnivelatividade.delete({
                    where: { id: parseInt(req.query.id as string) }
                });
            });
            return res.status(200).json({msg: 'Nível de atividade deletado com sucesso.'});
        } catch (error) {
            const tratamento = await tratamentoError(error);
            return res.status(tratamento.status).json({msg: tratamento.msg});
        } finally {
            await req.prisma.$disconnect();
        };
    };

    static async selectNivelatividade(req: Request, res: Response){
        try {
            if(req.query.id){
                const response = await req.prisma.tbnivelatividade.findUnique({ where: { id: parseInt(req.query.id as string) }});
                return res.status(200).json(response);
            };
            return res.status(200).json(await req.prisma.tbnivelatividade.findMany());
        } catch (error) {
            const tratamento = await tratamentoError(error);
            return res.status(tratamento.status).json({msg: tratamento.msg});
        };
    };
};