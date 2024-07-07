import express, { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';
import { ContratoDTO } from "../model/Interfaces";
import { tratamentoError } from "../messaging/Excepitions";

dotenv.config();

export default class ContratoController {
    static async createContrato(req: Request, res: Response) {
        try {
            const result = await req.prisma.$transaction(async (prismaTransaction) => {
                await prismaTransaction.tbcontato.create({ data: req.body });
            });
            return result;
        } catch (error) {
            if(error instanceof Error){
                const tratamento = await tratamentoError(error);
                return {status: tratamento.status, msg: tratamento.msg};
            };
            return {status: 500, msg: 'Houve uma falha crítica no sistema. Por favor, entre em contato com um especialista.'};
        } finally {
            await req.prisma.$disconnect();
        };
    };

    static async updateContrato(req:Request, res: Response) {
        try {
            const result = req.prisma.$transaction(async (prismaTransaction) => {
                await prismaTransaction.tbcontrato.update({ where: { id: parseInt(req.query.id as string) }, data: req.body });
                return {status: 200, msg: 'Contrato atualizado com sucesso.'};
            });
            return result;
        } catch (error) {
            if(error instanceof Error){
                const tratamento = await tratamentoError(error);
                return {status: tratamento.status, msg: tratamento.msg};
            };
            return {status: 500, msg: 'Houve uma falha crítica no sistema. Por favor, entre em contato com um especialista.'};
        } finally {
            await req.prisma.$disconnect();
        }
    }
};