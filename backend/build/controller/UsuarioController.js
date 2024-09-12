"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Excepitions_1 = require("../messaging/Excepitions");
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
const isPasswordValid = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#-])[A-Za-z\d@$!%*?&#-]{8,}$/;
    return regex.test(password);
};
class UsuarioController {
    static createUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //criar uma validação de senha forte
                if (!isPasswordValid(req.body.password)) {
                    return res.status(400).json({
                        msg: 'A senha deve conter pelo menos 8 caracteres, incluindo 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial.'
                    });
                }
                ;
                let hashePassword = yield bcrypt_1.default.hash(req.body.password, 10);
                yield req.prisma.$transaction((prismaTransaction) => __awaiter(this, void 0, void 0, function* () {
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
                }));
                return res.status(201).json({ msg: 'Novo usuário cadastrado com sucesso.' });
            }
            catch (error) {
                console.log(error);
                const tratamento = yield (0, Excepitions_1.tratamentoError)(error);
                return res.status(tratamento.status).json({ msg: tratamento.msg });
            }
            finally {
                yield req.prisma.$disconnect();
            }
        });
    }
    ;
    static updateUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield req.prisma.$transaction((prismaTransaction) => __awaiter(this, void 0, void 0, function* () {
                    const updateData = {};
                    if (req.body.permissao) {
                        updateData.permissao = req.body.permissao;
                    }
                    ;
                    if (req.body.situacao) {
                        updateData.situacao = req.body.situacao;
                    }
                    ;
                    updateData.dtacadastro = new Date(Date.now());
                    return prismaTransaction.tbusuario.update({
                        where: { id: parseInt(req.query.id, 10), situacao: 1 },
                        data: updateData
                    });
                }));
                return res.status(201).json({ msg: 'Usuário atualizado com sucesso.' });
            }
            catch (error) {
                console.log(error);
                const tratamento = yield (0, Excepitions_1.tratamentoError)(error);
                return res.status(tratamento.status).json({ msg: tratamento.msg });
            }
            finally {
                yield req.prisma.$disconnect();
            }
        });
    }
    ;
    static deleteUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield req.prisma.$transaction((prismaTransaction) => __awaiter(this, void 0, void 0, function* () {
                    return yield prismaTransaction.tbusuario.update({
                        where: { id: parseInt(req.query.id, 10), situacao: 1 },
                        data: {
                            situacao: 0
                        }
                    });
                }));
                return res.status(200).json({ msg: "Usuário deletado com sucesso." });
            }
            catch (error) {
                console.log(error);
                const tratamento = yield (0, Excepitions_1.tratamentoError)(error);
                return res.status(tratamento.status).json({ msg: tratamento.msg });
            }
            finally {
                yield req.prisma.$disconnect();
            }
        });
    }
    static selectUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
            try {
                console.log(req.query.id);
                if (req.query.id) {
                    console.log('Entrou aqui');
                    const response = yield req.prisma.tbusuario.findUnique({
                        where: {
                            id: parseInt(req.query.id, 10),
                            situacao: 1
                        },
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
                    if (response) {
                        const user = {
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
                                    id: (_b = (_a = response.pessoa.tipofisico) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : null,
                                    descricao: (_d = (_c = response.pessoa.tipofisico) === null || _c === void 0 ? void 0 : _c.descricao) !== null && _d !== void 0 ? _d : null
                                },
                                nivelatividade: {
                                    id: (_f = (_e = response.pessoa.nivelatividade) === null || _e === void 0 ? void 0 : _e.id) !== null && _f !== void 0 ? _f : null,
                                    descricao: (_h = (_g = response.pessoa.nivelatividade) === null || _g === void 0 ? void 0 : _g.descricao) !== null && _h !== void 0 ? _h : null
                                },
                                objetivo: {
                                    id: (_k = (_j = response.pessoa.objetivo) === null || _j === void 0 ? void 0 : _j.id) !== null && _k !== void 0 ? _k : null,
                                    descricao: (_m = (_l = response.pessoa.objetivo) === null || _l === void 0 ? void 0 : _l.descricao) !== null && _m !== void 0 ? _m : null
                                },
                                situacao: response.pessoa.situacao,
                                tipopessoa: {
                                    id: response.pessoa.tipopessoa.id,
                                    descricao: response.pessoa.tipopessoa.descricao
                                },
                                contato: response.pessoa.contato.map((contato) => {
                                    var _a, _b, _c;
                                    return ({
                                        id: contato.id,
                                        pessoaid: contato.pessoaid,
                                        telefone: (_a = contato.telefone) !== null && _a !== void 0 ? _a : null,
                                        celular: (_b = contato.celular) !== null && _b !== void 0 ? _b : null,
                                        email: (_c = contato.email) !== null && _c !== void 0 ? _c : null
                                    });
                                }),
                                endereco: response.pessoa.endereco.map((endereco) => {
                                    var _a;
                                    return ({
                                        id: endereco.id,
                                        pessoaid: endereco.pessoaid,
                                        cep: endereco.cep,
                                        rua: endereco.rua,
                                        numero: (_a = endereco.numero) !== null && _a !== void 0 ? _a : null,
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
                                    });
                                })
                            }
                        };
                        return res.status(200).json(user);
                    }
                    else {
                        return res.status(200).json({ page: 0, pageSize: 0, total: 0, dados: [] });
                    }
                    ;
                }
                else {
                    const skip = (parseInt(req.query.page, 10) - 1) * parseInt(req.query.pageSize, 10);
                    const take = parseInt(req.query.pageSize, 10);
                    const total = yield req.prisma.tbusuario.count({ where: { situacao: 1 } });
                    const dados = yield req.prisma.tbusuario.findMany({
                        where: { situacao: 1 },
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
                    if (!dados) {
                        return res.status(200).json({ page: skip, pageSize: take, total: total, dados: [] });
                    }
                    const usuarios = dados.map((response) => {
                        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
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
                                    id: (_b = (_a = response.pessoa.tipofisico) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : null,
                                    descricao: (_d = (_c = response.pessoa.tipofisico) === null || _c === void 0 ? void 0 : _c.descricao) !== null && _d !== void 0 ? _d : null
                                },
                                nivelatividade: {
                                    id: (_f = (_e = response.pessoa.nivelatividade) === null || _e === void 0 ? void 0 : _e.id) !== null && _f !== void 0 ? _f : null,
                                    descricao: (_h = (_g = response.pessoa.nivelatividade) === null || _g === void 0 ? void 0 : _g.descricao) !== null && _h !== void 0 ? _h : null
                                },
                                objetivo: {
                                    id: (_k = (_j = response.pessoa.objetivo) === null || _j === void 0 ? void 0 : _j.id) !== null && _k !== void 0 ? _k : null,
                                    descricao: (_m = (_l = response.pessoa.objetivo) === null || _l === void 0 ? void 0 : _l.descricao) !== null && _m !== void 0 ? _m : null
                                },
                                situacao: response.pessoa.situacao,
                                tipopessoa: {
                                    id: response.pessoa.tipopessoa.id,
                                    descricao: response.pessoa.tipopessoa.descricao
                                },
                                contato: response.pessoa.contato.map((contato) => {
                                    var _a, _b, _c;
                                    return ({
                                        id: contato.id,
                                        pessoaid: contato.pessoaid,
                                        telefone: (_a = contato.telefone) !== null && _a !== void 0 ? _a : null,
                                        celular: (_b = contato.celular) !== null && _b !== void 0 ? _b : null,
                                        email: (_c = contato.email) !== null && _c !== void 0 ? _c : null
                                    });
                                }),
                                endereco: response.pessoa.endereco.map((endereco) => {
                                    var _a;
                                    return ({
                                        id: endereco.id,
                                        pessoaid: endereco.pessoaid,
                                        cep: endereco.cep,
                                        rua: endereco.rua,
                                        numero: (_a = endereco.numero) !== null && _a !== void 0 ? _a : null,
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
                                    });
                                })
                            }
                        };
                    });
                    return res.status(200).json({ page: skip, pageSize: take, total: total, dados: usuarios });
                }
            }
            catch (error) {
                console.log(error);
                const tratamento = yield (0, Excepitions_1.tratamentoError)(error);
                return res.status(tratamento.status).json({ msg: tratamento.msg });
            }
            finally {
                yield req.prisma.$disconnect();
            }
        });
    }
}
exports.default = UsuarioController;
//# sourceMappingURL=UsuarioController.js.map