import { Request, Response } from 'express';
import { tratamentoError } from "../messaging/Excepitions";
import dotenv from 'dotenv';

dotenv.config();

export default class ObjetivoController{
    static async createObjetivo(req: Request, res: Response){
        try {
            await req.prisma.$transaction(async (prismaTransaction) => {
                return prismaTransaction.tbobjetivo.create({
                    data: {
                        descricao: req.body.descricao
                    }
                });
            });
            return res.status(200).json({msg: 'Novo objetivo cadastrado com sucesso.'});
        } catch (error) {
            const tratamento = await tratamentoError(error);
            return res.status(tratamento.status).json({msg: tratamento.msg});
        } finally {
            await req.prisma.$disconnect();
        };
    };

    static async updateObjetivo(req: Request, res: Response){
        try {
            await req.prisma.$transaction(async (prismaTransaction) => {
                return prismaTransaction.tbobjetivo.update({
                    where: { id: parseInt(req.query.id as string) },
                    data: {
                        descricao: req.body.descricao
                    }
                });
            });
            return res.status(200).json({msg: 'Objetivo atualizado com sucesso.'});
        } catch (error) {
            const tratamento = await tratamentoError(error);
            return res.status(tratamento.status).json({msg: tratamento.msg});
        } finally {
            await req.prisma.$disconnect();
        };
    };

    static async deleteObjetivo(req: Request, res: Response){
        try {
            await req.prisma.$transaction(async (prismaTransaction) => {
                return prismaTransaction.tbobjetivo.delete({
                    where: { id: parseInt(req.query.id as string) }
                });
            });
            return res.status(200).json({msg: 'Objetivo deletado com sucesso.'});
        } catch (error) {
            const tratamento = await tratamentoError(error);
            return res.status(tratamento.status).json({msg: tratamento.msg});
        } finally {
            await req.prisma.$disconnect();
        };
    };

    static async selectObjetivo(req: Request, res: Response){
        try {
            if(req.query.id){
                const response = await req.prisma.tbobjetivo.findUnique({ where: { id: parseInt(req.query.id as string) }});
                return res.status(200).json(response);
            };
            return res.status(200).json(await req.prisma.tbobjetivo.findMany());
        } catch (error) {
            const tratamento = await tratamentoError(error);
            return res.status(tratamento.status).json({msg: tratamento.msg});
        };
    };
};