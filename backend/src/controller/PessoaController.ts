import { Request, Response} from 'express';
import { tratamentoError } from '../messaging/Excepitions';
import dotenv from 'dotenv';
dotenv.config();

export default class PessoaController {
    static async createPessoa(req: Request, res: Response) {
        try {
            await req.prisma.$transaction(async (prismaTransaction) => {
                const pessoa = await prismaTransaction.tbpessoa.create({
                    data: {
                        codigo: req.body.codigo,
                        nome: req.body.nome,
                        sobrenome: req.body.sobrenome,
                        cpf: req.body.cpf,
                        datanascimento: new Date(req.body.datanascimento),
                        sexo: req.body.sexo,
                        ...(req.body.tipofisicoid != undefined && {tipofisicoid: req.body.tipofisicoid}),
                        ...(req.body.nivelatividadeid != undefined && {nivelatividadeid: req.body.nivelatividadeid}),
                        ...(req.body.objetivoid != undefined && {objetivoid: req.body.objetivoid}),
                        situacao: req.body.situacao,
                        tipopessoaid: req.body.tipopessoaid
                    }
                });
                const contato = await prismaTransaction.tbcontato.create({
                    data: {
                        pessoaid: pessoa.id,
                        telefone: req.body.contato.telefone,
                        celular: req.body.contato.celular,
                        email: req.body.contato.email
                    }
                });
                const endereco = await prismaTransaction.tbendereco.create({
                    data: {
                        pessoaid: pessoa.id,
                        cep: req.body.endereco.cep,
                        rua: req.body.endereco.rua,
                        numero: req.body.endereco.numero,
                        cidadeid: req.body.endereco.cidadeid,
                        bairro: req.body.endereco.bairro,
                        estadoid: req.body.endereco.estadoid,
                        complemento: req.body.endereco.complemento
                    }
                });
                return { pessoa, contato, endereco };
            });
            return res.status(200).json({msg: 'Novo cadastro realizado com sucesso.'});
        } catch (error) {
            const tratamento = await tratamentoError(error);
            return res.status(tratamento.status).json({msg: tratamento.msg})
        } finally {
            await req.prisma.$disconnect();
        };
    };
}