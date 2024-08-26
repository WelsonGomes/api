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
const dotenv_1 = __importDefault(require("dotenv"));
const Excepitions_1 = require("../messaging/Excepitions");
dotenv_1.default.config();
class ContratoController {
    static createContrato(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield req.prisma.$transaction((prismaTransaction) => __awaiter(this, void 0, void 0, function* () {
                    return prismaTransaction.tbcontrato.create({
                        data: {
                            contrato: req.body.contrato,
                            clienteid: req.body.clienteid,
                            dtinicio: new Date(req.body.dtinicio),
                            qtdmeses: req.body.qtdmeses,
                            dttermino: new Date(req.body.dttermino),
                            valor: req.body.valor,
                            valormensal: req.body.valormensal,
                            responsavel: req.body.responsavel,
                            dtcadastro: new Date(req.body.dtcadastro),
                            cedente: req.body.cedente,
                            cessionaria: req.body.cessionaria,
                            descricao: req.body.descricao,
                            status: req.body.status,
                            dtassinatura: new Date(req.body.dtassinatura)
                        }
                    });
                }));
                return res.status(200).json({ msg: 'Novo contrato cadastrado com sucesso.' });
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
    static updateContrato(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield req.prisma.$transaction((prismaTransaction) => __awaiter(this, void 0, void 0, function* () {
                    return prismaTransaction.tbcontrato.update({
                        where: {
                            id: parseInt(req.query.id)
                        },
                        data: {
                            contrato: req.body.contrato,
                            clienteid: req.body.clienteid,
                            dtinicio: new Date(req.body.dtinicio),
                            qtdmeses: req.body.qtdmeses,
                            dttermino: new Date(req.body.dttermino),
                            valor: req.body.valor,
                            valormensal: req.body.valormensal,
                            responsavel: req.body.responsavel,
                            dtcadastro: new Date(req.body.dtcadastro),
                            cedente: req.body.cedente,
                            cessionaria: req.body.cessionaria,
                            descricao: req.body.descricao,
                            status: req.body.status,
                            dtassinatura: new Date(req.body.dtassinatura)
                        }
                    });
                }));
                return res.status(200).json({ msg: 'Contrato alterado com sucesso.' });
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
    static deleteContrato(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield req.prisma.$transaction((prismaTransaction) => __awaiter(this, void 0, void 0, function* () {
                    return prismaTransaction.tbcontrato.update({
                        where: {
                            id: parseInt(req.query.id),
                            clienteid: parseInt(req.query.cliente),
                            status: 1
                        },
                        data: { status: 0 }
                    });
                }));
                return res.status(200).json({ msg: 'Contrado deletado com sucesso.' });
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
    static selectContrato(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = parseInt(req.query.id, 10);
                if (id > 0) {
                    const response = yield req.prisma.tbcontrato.findUnique({
                        where: {
                            id: parseInt(req.query.id),
                            status: 1
                        }
                    });
                    return res.status(200).json({
                        page: req.query.page,
                        pageSize: req.query.pageSize,
                        data: response
                    });
                }
                ;
                let skip = parseInt(req.query.page, 10);
                let take = parseInt(req.query.pageSize, 10);
                const total = yield req.prisma.tbcontrato.count({ where: { status: 1 } });
                skip = (skip - 1) * take;
                const response = yield req.prisma.tbcontrato.findMany({
                    where: { status: 1 },
                    skip: skip,
                    take: take,
                    orderBy: { dtinicio: 'asc' },
                    include: {
                        cliente: {
                            include: {
                                cidade: {
                                    include: { estado: true }
                                }
                            }
                        }
                    }
                });
                if (!response.length) {
                    return res.status(200).json({
                        total: 0,
                        page: req.query.page,
                        pageSize: req.query.pageSize,
                        data: []
                    });
                }
                ;
                const result = response.map((dados) => {
                    return {
                        id: dados.id,
                        contrato: dados.contrato,
                        clienteid: dados.clienteid,
                        dtinicio: dados.dtinicio,
                        qtdmeses: dados.qtdmeses,
                        dttermino: dados.dttermino,
                        valor: dados.valor,
                        valormensal: dados.valormensal,
                        responsavel: dados.responsavel,
                        dtcadastro: dados.dtcadastro,
                        cedente: dados.cedente,
                        cessionaria: dados.cessionaria,
                        descricao: dados.descricao,
                        status: dados.status,
                        dtassinatura: dados.dtassinatura,
                        dtatualizacao: dados.dtatualizacao,
                        cliente: {
                            id: dados.cliente.id,
                            cnpjcpf: dados.cliente.cnpjcpf,
                            razaosocial: dados.cliente.razaosocial,
                            fantasia: dados.cliente.fantasia,
                            datacriacao: dados.cliente.datacriacao,
                            responsavel: dados.cliente.responsavel,
                            situacao: dados.cliente.situacao,
                            email: dados.cliente.email,
                            telefone: dados.cliente.telefone,
                            celular: dados.cliente.celular,
                            estadoid: dados.cliente.estadoid,
                            cidadeid: dados.cliente.cidadeid,
                            cep: dados.cliente.cep,
                            logradouro: dados.cliente.logradouro,
                            numero: dados.cliente.numero,
                            bairro: dados.cliente.bairro,
                            complemento: dados.cliente.complemento,
                            datacadastro: dados.cliente.datacadastro,
                            cidade: {
                                id: dados.cliente.cidade.id,
                                nome: dados.cliente.cidade.nome,
                                estadoid: dados.cliente.cidade.estadoid,
                                codigoibge: dados.cliente.cidade.codigoibge,
                                estado: {
                                    id: dados.cliente.cidade.estado.id,
                                    nome: dados.cliente.cidade.estado.nome,
                                    uf: dados.cliente.cidade.estado.uf,
                                    pais: dados.cliente.cidade.estado.pais
                                }
                            }
                        }
                    };
                });
                return res.status(200).json({
                    total: total,
                    page: req.query.page,
                    pageSize: req.query.pageSize,
                    data: result
                });
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
}
exports.default = ContratoController;
;
//# sourceMappingURL=ContratoController.js.map