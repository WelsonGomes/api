import { Request, Response} from 'express';
import { tratamentoError } from '../messaging/Excepitions';
import dotenv from 'dotenv';
import { getValidaCpfCnpj } from '../functions/Validacoes';
import { PessoaDTO } from '../model/Interfaces';
dotenv.config();

export default class PessoaController {
    static async createPessoa(req: Request, res: Response) {
        try {
            if(!await getValidaCpfCnpj(req.body.cpf)){
                return res.status(400).json({msg: 'Este CPF é inválido. Favor verifique.'})
            };
            let tPessoa = 0;
            const rota = req.route.path as string;
            switch (rota){
                case '/Professor':
                    tPessoa = 1;
                    break;
                case '/Aluno':
                    tPessoa = 2;
                    break;
                default:
                    return res.status(400).json({msg: 'Não foi possível identificar o tipo da pessoa.'});
            };
            await req.prisma.$transaction(async (prismaTransaction) => {
                const pessoa = await prismaTransaction.tbpessoa.create({
                    data: {
                        codigo: req.body.codigo,
                        nome: req.body.nome,
                        sobrenome: req.body.sobrenome,
                        cpf: req.body.cpf.replace(/[^\d]+/g, ''),
                        datanascimento: new Date(req.body.datanascimento),
                        sexo: req.body.sexo,
                        ...(req.body.tipofisicoid != undefined && {tipofisicoid: req.body.tipofisicoid}),
                        ...(req.body.nivelatividadeid != undefined && {nivelatividadeid: req.body.nivelatividadeid}),
                        ...(req.body.objetivoid != undefined && {objetivoid: req.body.objetivoid}),
                        situacao: req.body.situacao,
                        tipopessoaid: tPessoa
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
            console.log(error)
            const tratamento = await tratamentoError(error);
            return res.status(tratamento.status).json({msg: tratamento.msg});
        } finally {
            await req.prisma.$disconnect();
        };
    };

    static async updatePessoa(req: Request, res: Response) {
        try {
            if(!await getValidaCpfCnpj(req.body.cpf)){
                return res.status(400).json({msg: 'Este CPF é inválido. Favor verifique.'})
            };
            let tPessoa = 0;
            const rota = req.route.path as string;
            switch (rota){
                case '/Professor':
                    tPessoa = 1;
                    break;
                case '/Aluno':
                    tPessoa = 2;
                    break;
                default:
                    return res.status(400).json({msg: 'Não foi possível identificar o tipo da pessoa.'});
            };
            await req.prisma.$transaction(async (prismaTransaction) => {
                const pessoa = await prismaTransaction.tbpessoa.update({
                    where: { 
                        id: parseInt(req.query.id as string), 
                        situacao: 1 
                    },
                    data: {
                        codigo: req.body.codigo,
                        nome: req.body.nome,
                        sobrenome: req.body.sobrenome,
                        cpf: req.body.cpf.replace(/[^\d]+/g, ''),
                        datanascimento: new Date(req.body.datanascimento),
                        sexo: req.body.sexo,
                        ...(req.body.tipofisicoid != undefined && {tipofisicoid: req.body.tipofisicoid}),
                        ...(req.body.nivelatividadeid != undefined && {nivelatividadeid: req.body.nivelatividadeid}),
                        ...(req.body.objetivoid != undefined && {objetivoid: req.body.objetivoid}),
                        situacao: req.body.situacao,
                        tipopessoaid: tPessoa
                    }
                });
                const contato = await prismaTransaction.tbcontato.update({
                    where: { 
                        id: parseInt(req.body.contato.id) 
                    },
                    data: {
                        pessoaid: pessoa.id,
                        telefone: req.body.contato.telefone,
                        celular: req.body.contato.celular,
                        email: req.body.contato.email
                    }
                });
                const endereco = await prismaTransaction.tbendereco.update({
                    where: { 
                        id: parseInt(req.body.endereco.id) 
                    },
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
            return res.status(200).json({msg: 'Cadastro atualizado com sucesso.'});
        } catch (error) {
            const tratamento = await tratamentoError(error);
            console.log(error);
            return res.status(tratamento.status).json({msg: tratamento.msg});
        } finally {
            await req.prisma.$disconnect();
        };
    };

    static async deletePessoa(req: Request, res: Response) {
        try {
            await req.prisma.$transaction(async (prismaTransaction) => {
                const pessoa = await prismaTransaction.tbpessoa.update({
                    where: { 
                        id: parseInt(req.query.id as string), 
                        situacao: 1 
                    },
                    data: {
                        situacao: 0
                    }
                });
                const contato = await prismaTransaction.tbcontato.deleteMany({
                    where: { pessoaid: pessoa.id }
                });
                const endereco = await prismaTransaction.tbendereco.deleteMany({
                    where: { pessoaid: pessoa.id }
                });
                return { pessoa, contato, endereco };
            });
            return res.status(200).json({msg: 'Registro deletado com sucesso'});
        } catch (error) {
            const tratamento = await tratamentoError(error);
            return res.status(tratamento.status).json({msg: tratamento.msg})
        } finally {
            await req.prisma.$disconnect();
        };
    };

    static async selectPessoa(req: Request, res: Response) {
        try {
            if(req.query.id){
                return res.status(200).json(await req.prisma.tbpessoa.findUnique({ 
                    where: { 
                        id: parseInt(req.query.id as string,10), 
                        situacao: 1 
                    }
                }));
            };
            const skip = (parseInt(req.query.page as string,10) - 1) * parseInt(req.query.pageSize as string,10);
            const take = parseInt(req.query.pageSize as string,10);
            const total = await req.prisma.tbpessoa.count({ where: { situacao: 1 }});
            const response = await req.prisma.tbpessoa.findMany({
                where: { situacao: 1 },
                skip: skip,
                take: take,
                orderBy: {nome: 'asc'},
                include: { 
                    tipofisico: true, 
                    nivelatividade: true, 
                    objetivo: true, 
                    tipopessoa: true,
                    contato: true, 
                    endereco: {
                        include: {
                            cidade: {
                                include: {
                                    estado: true
                                }
                            }
                        }
                    } 
                }
            });
            if(!response) {
                return res.status(200).json([]);
            };
            const pessoa: PessoaDTO[] = response.map((dados) => {
                return {
                    id: dados.id,
                    codigo: dados.codigo,
                    nome: dados.nome,
                    sobrenome: dados.sobrenome,
                    cpf: dados.cpf,
                    sexo: dados.sexo,
                    datanascimento: dados.datanascimento,
                    tipofisico: {
                        id: dados.tipofisico?.id ?? null,
                        descricao: dados.tipofisico?.descricao ?? null
                    },
                    nivelatividade: {
                        id: dados.nivelatividade?.id ?? null,
                        descricao: dados.nivelatividade?.descricao ?? null
                    },
                    objetivo: {
                        id: dados.objetivo?.id ?? null,
                        descricao: dados.objetivo?.descricao ?? null
                    },
                    situacao: dados.situacao,
                    tipopessoa: {
                        id: dados.tipopessoa.id,
                        descricao: dados.tipopessoa.descricao
                    },
                    contato: dados.contato.map((contato) => ({
                        id: contato.id,
                        pessoaid: contato.pessoaid,
                        telefone: contato.telefone ?? null,
                        celular: contato.celular ?? null,
                        email: contato.email ?? null
                    })),
                    endereco: dados.endereco.map((endereco) => ({
                        id: endereco.id,
                        pessoaid: endereco.pessoaid,
                        cep: endereco.cep,
                        rua: endereco.rua,
                        numero: endereco.numero ?? null,
                        cidadeid: endereco.cidadeid,
                        cidade: {
                            id: endereco.cidade.id,
                            nome: endereco.cidade.nome,
                            estado: {
                                id: endereco.cidade.estado.id,
                                nome: endereco.cidade.estado.nome,
                                uf: endereco.cidade.estado.uf,
                                pais: endereco.cidade.estado.pais
                            },
                            codigoibge: endereco.cidade.codigoibge
                        },
                        bairro: endereco.bairro,
                        estadoid: endereco.estadoid,
                        complemento: endereco.complemento
                    }))
                }
            });
            return res.status(200).json({page: skip, pageSize: take, total: total, dados: pessoa});
        } catch (error) {
            const tratamento = await tratamentoError(error);
            return res.status(tratamento.status).json({msg: tratamento.msg});
        };
    };
}