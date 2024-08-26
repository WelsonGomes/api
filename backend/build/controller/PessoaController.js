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
const Validacoes_1 = require("../functions/Validacoes");
dotenv_1.default.config();
class PessoaController {
    static createPessoa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(yield (0, Validacoes_1.getValidaCpfCnpj)(req.body.cpf))) {
                    return res.status(400).json({ msg: 'Este CPF é inválido. Favor verifique.' });
                }
                ;
                let tPessoa = 0;
                const rota = req.route.path;
                switch (rota) {
                    case '/Professor':
                        tPessoa = 1;
                        break;
                    case '/Aluno':
                        tPessoa = 2;
                        break;
                    default:
                        return res.status(400).json({ msg: 'Não foi possível identificar o tipo da pessoa.' });
                }
                ;
                yield req.prisma.$transaction((prismaTransaction) => __awaiter(this, void 0, void 0, function* () {
                    const pessoa = yield prismaTransaction.tbpessoa.create({
                        data: Object.assign(Object.assign(Object.assign(Object.assign({ codigo: req.body.codigo, nome: req.body.nome, sobrenome: req.body.sobrenome, cpf: req.body.cpf.replace(/[^\d]+/g, ''), datanascimento: new Date(req.body.datanascimento), sexo: req.body.sexo }, (req.body.tipofisicoid != undefined && { tipofisicoid: req.body.tipofisicoid })), (req.body.nivelatividadeid != undefined && { nivelatividadeid: req.body.nivelatividadeid })), (req.body.objetivoid != undefined && { objetivoid: req.body.objetivoid })), { situacao: req.body.situacao, tipopessoaid: tPessoa })
                    });
                    const contato = yield prismaTransaction.tbcontato.create({
                        data: {
                            pessoaid: pessoa.id,
                            telefone: req.body.contato.telefone,
                            celular: req.body.contato.celular,
                            email: req.body.contato.email
                        }
                    });
                    const endereco = yield prismaTransaction.tbendereco.create({
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
                }));
                return res.status(200).json({ msg: 'Novo cadastro realizado com sucesso.' });
            }
            catch (error) {
                console.log(error);
                const tratamento = yield (0, Excepitions_1.tratamentoError)(error);
                return res.status(tratamento.status).json({ msg: tratamento.msg });
            }
            finally {
                yield req.prisma.$disconnect();
            }
            ;
        });
    }
    ;
    static updatePessoa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(yield (0, Validacoes_1.getValidaCpfCnpj)(req.body.cpf))) {
                    return res.status(400).json({ msg: 'Este CPF é inválido. Favor verifique.' });
                }
                ;
                let tPessoa = 0;
                const rota = req.route.path;
                switch (rota) {
                    case '/Professor':
                        tPessoa = 1;
                        break;
                    case '/Aluno':
                        tPessoa = 2;
                        break;
                    default:
                        return res.status(400).json({ msg: 'Não foi possível identificar o tipo da pessoa.' });
                }
                ;
                yield req.prisma.$transaction((prismaTransaction) => __awaiter(this, void 0, void 0, function* () {
                    const pessoa = yield prismaTransaction.tbpessoa.update({
                        where: {
                            id: parseInt(req.query.id),
                            situacao: 1
                        },
                        data: Object.assign(Object.assign(Object.assign(Object.assign({ codigo: req.body.codigo, nome: req.body.nome, sobrenome: req.body.sobrenome, cpf: req.body.cpf.replace(/[^\d]+/g, ''), datanascimento: new Date(req.body.datanascimento), sexo: req.body.sexo }, (req.body.tipofisicoid != undefined && { tipofisicoid: req.body.tipofisicoid })), (req.body.nivelatividadeid != undefined && { nivelatividadeid: req.body.nivelatividadeid })), (req.body.objetivoid != undefined && { objetivoid: req.body.objetivoid })), { situacao: req.body.situacao, tipopessoaid: tPessoa })
                    });
                    const contato = yield prismaTransaction.tbcontato.update({
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
                    const endereco = yield prismaTransaction.tbendereco.update({
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
                }));
                return res.status(200).json({ msg: 'Cadastro atualizado com sucesso.' });
            }
            catch (error) {
                const tratamento = yield (0, Excepitions_1.tratamentoError)(error);
                console.log(error);
                return res.status(tratamento.status).json({ msg: tratamento.msg });
            }
            finally {
                yield req.prisma.$disconnect();
            }
            ;
        });
    }
    ;
    static deletePessoa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield req.prisma.$transaction((prismaTransaction) => __awaiter(this, void 0, void 0, function* () {
                    const pessoa = yield prismaTransaction.tbpessoa.update({
                        where: {
                            id: parseInt(req.query.id),
                            situacao: 1
                        },
                        data: {
                            situacao: 0
                        }
                    });
                    const contato = yield prismaTransaction.tbcontato.deleteMany({
                        where: { pessoaid: pessoa.id }
                    });
                    const endereco = yield prismaTransaction.tbendereco.deleteMany({
                        where: { pessoaid: pessoa.id }
                    });
                    return { pessoa, contato, endereco };
                }));
                return res.status(200).json({ msg: 'Registro deletado com sucesso' });
            }
            catch (error) {
                const tratamento = yield (0, Excepitions_1.tratamentoError)(error);
                return res.status(tratamento.status).json({ msg: tratamento.msg });
            }
            finally {
                yield req.prisma.$disconnect();
            }
            ;
        });
    }
    ;
    static selectPessoa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.query.id) {
                    return res.status(200).json(yield req.prisma.tbpessoa.findUnique({
                        where: {
                            id: parseInt(req.query.id, 10),
                            situacao: 1
                        }
                    }));
                }
                ;
                const skip = (parseInt(req.query.page, 10) - 1) * parseInt(req.query.pageSize, 10);
                const take = parseInt(req.query.pageSize, 10);
                const total = yield req.prisma.tbpessoa.count({ where: { situacao: 1 } });
                const response = yield req.prisma.tbpessoa.findMany({
                    where: { situacao: 1 },
                    skip: skip,
                    take: take,
                    orderBy: { nome: 'asc' },
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
                if (!response) {
                    return res.status(200).json([]);
                }
                ;
                const pessoa = response.map((dados) => {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
                    return {
                        id: dados.id,
                        codigo: dados.codigo,
                        nome: dados.nome,
                        sobrenome: dados.sobrenome,
                        cpf: dados.cpf,
                        sexo: dados.sexo,
                        datanascimento: dados.datanascimento,
                        tipofisico: {
                            id: (_b = (_a = dados.tipofisico) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : null,
                            descricao: (_d = (_c = dados.tipofisico) === null || _c === void 0 ? void 0 : _c.descricao) !== null && _d !== void 0 ? _d : null
                        },
                        nivelatividade: {
                            id: (_f = (_e = dados.nivelatividade) === null || _e === void 0 ? void 0 : _e.id) !== null && _f !== void 0 ? _f : null,
                            descricao: (_h = (_g = dados.nivelatividade) === null || _g === void 0 ? void 0 : _g.descricao) !== null && _h !== void 0 ? _h : null
                        },
                        objetivo: {
                            id: (_k = (_j = dados.objetivo) === null || _j === void 0 ? void 0 : _j.id) !== null && _k !== void 0 ? _k : null,
                            descricao: (_m = (_l = dados.objetivo) === null || _l === void 0 ? void 0 : _l.descricao) !== null && _m !== void 0 ? _m : null
                        },
                        situacao: dados.situacao,
                        tipopessoa: {
                            id: dados.tipopessoa.id,
                            descricao: dados.tipopessoa.descricao
                        },
                        contato: dados.contato.map((contato) => {
                            var _a, _b, _c;
                            return ({
                                id: contato.id,
                                pessoaid: contato.pessoaid,
                                telefone: (_a = contato.telefone) !== null && _a !== void 0 ? _a : null,
                                celular: (_b = contato.celular) !== null && _b !== void 0 ? _b : null,
                                email: (_c = contato.email) !== null && _c !== void 0 ? _c : null
                            });
                        }),
                        endereco: dados.endereco.map((endereco) => {
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
                    };
                });
                return res.status(200).json({ page: skip, pageSize: take, total: total, dados: pessoa });
            }
            catch (error) {
                const tratamento = yield (0, Excepitions_1.tratamentoError)(error);
                return res.status(tratamento.status).json({ msg: tratamento.msg });
            }
            ;
        });
    }
    ;
}
exports.default = PessoaController;
//# sourceMappingURL=PessoaController.js.map