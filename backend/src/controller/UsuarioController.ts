import { Request, Response} from 'express';
import { tratamentoError } from '../messaging/Excepitions';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { UsuarioDTO } from '../model/Interfaces';
dotenv.config();

const isPasswordValid = (password: string): boolean => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#-])[A-Za-z\d@$!%*?&#-]{8,}$/;
    return regex.test(password);
};

export default class UsuarioController {
    

    static async createUsuario(req: Request, res: Response) {
        try{
            //criar uma validação de senha forte
            if (!isPasswordValid(req.body.password)) {
                return res.status(400).json({
                    msg: 'A senha deve conter pelo menos 8 caracteres, incluindo 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial.'
                });
            };
            let hashePassword = await bcrypt.hash(req.body.password, 10);
            await req.prisma.$transaction(async (prismaTransaction) => {
                return prismaTransaction.tbusuario.create({ 
                    data: {
                        pessoaid: req.body.pessoaid,
                        permissao: req.body.permissao,
                        usuario: req.body.usuario,
                        password: hashePassword,
                        situacao: req.body.situacao,
                        dtacadastro: new Date(Date.now())
                    }
                });
            });
            return res.status(201).json({msg: 'Novo usuário cadastrado com sucesso.'});
        } catch (error) {
            console.log(error)
            const tratamento = await tratamentoError(error);
            return res.status(tratamento.status).json({msg: tratamento.msg});
        } finally {
            await req.prisma.$disconnect();
        }
    };

    static async updateUsuario(req: Request, res: Response) {
        try{
            await req.prisma.$transaction(async (prismaTransaction) => {
                const updateData: any = {};
                if (req.body.permissao) {
                    updateData.permissao = req.body.permissao;
                };
                if (req.body.situacao) {
                    updateData.situacao = req.body.situacao;
                };
                updateData.dtacadastro = new Date(Date.now());
                return prismaTransaction.tbusuario.update({ 
                    where: { id: parseInt(req.query.id as string,10), situacao: 1 },
                    data: updateData
                });
            });
            return res.status(201).json({msg: 'Usuário atualizado com sucesso.'});
        } catch (error) {
            console.log(error)
            const tratamento = await tratamentoError(error);
            return res.status(tratamento.status).json({msg: tratamento.msg});
        } finally {
            await req.prisma.$disconnect();
        }
    };

    static async deleteUsuario(req: Request, res: Response) {
        try {
            await req.prisma.$transaction(async (prismaTransaction) => {
                return await prismaTransaction.tbusuario.update({
                    where: { id: parseInt(req.query.id as string,10), situacao: 1 },
                    data: {
                        situacao: 0
                    }
                });
            });
            return res.status(200).json({msg: "Usuário deletado com sucesso."});
        } catch (error) {
            console.log(error)
            const tratamento = await tratamentoError(error);
            return res.status(tratamento.status).json({msg: tratamento.msg});
        } finally {
            await req.prisma.$disconnect();
        }
    }

    static async selectUsuario(req: Request, res: Response) {
        try {
            console.log("Buscando todos os usuários");
            const skip = (parseInt(req.query.page as string,10) - 1) * parseInt(req.query.pageSize as string,10);
            const take = parseInt(req.query.pageSize as string,10);
            console.log("Buscando o total de registro na base");
            const total = await req.prisma.tbusuario.count({ where: { situacao: 1 }});
            const id = parseInt(req.query.id as string,10);
            const dados = await req.prisma.tbusuario.findMany({ 
                where: { situacao: 1, ...(id && { id }) },
                include: { 
                    pessoa: {
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
                    } 
                }
            });
            if(!dados){
                console.log("Não foi encontrado usuários");
                return res.status(200).json({page: skip, pageSize: take, total: total, dados: []});
            };
            console.log("Montando json para retorno do usuários");
            const usuarios: UsuarioDTO[] = dados.map((response) => {
                return {
                    id: response.id,
                    pessoaid: response.pessoaid,
                    permissao: response.permissao,
                    usuario: response.usuario,
                    password: "",
                    situacao: response.situacao,
                    dtacadastro: response.dtacadastro,
                    pessoa: {
                        id: response.pessoa.id,
                        codigo: response.pessoa.codigo,
                        nome: response.pessoa.nome,
                        sobrenome: response.pessoa.sobrenome,
                        cpf: response.pessoa.cpf,
                        sexo: response.pessoa.sexo,
                        datanascimento: response.pessoa.datanascimento,
                        tipofisico: {
                            id: response.pessoa.tipofisico?.id ?? null,
                            descricao: response.pessoa.tipofisico?.descricao ?? null
                        },
                        nivelatividade: {
                            id: response.pessoa.nivelatividade?.id ?? null,
                            descricao: response.pessoa.nivelatividade?.descricao ?? null
                        },
                        objetivo: {
                            id: response.pessoa.objetivo?.id ?? null,
                            descricao: response.pessoa.objetivo?.descricao ?? null
                        },
                        situacao: response.pessoa.situacao,
                        tipopessoa: {
                            id: response.pessoa.tipopessoa.id,
                            descricao: response.pessoa.tipopessoa.descricao
                        },
                        contato: response.pessoa.contato.map((contato) => ({
                            id: contato.id,
                            pessoaid: contato.pessoaid,
                            telefone: contato.telefone ?? null,
                            celular: contato.celular ?? null,
                            email: contato.email ?? null
                        })),
                        endereco: response.pessoa.endereco.map((endereco) => ({
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
                }
            });
            return res.status(200).json({page: skip, pageSize: take, total: total, dados: usuarios});
        } catch (error) {
            console.log(error)
            const tratamento = await tratamentoError(error);
            return res.status(tratamento.status).json({msg: tratamento.msg});
        } finally {
            await req.prisma.$disconnect();
        }
    }
}