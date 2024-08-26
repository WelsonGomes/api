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
exports.createCliente = createCliente;
exports.updateCliente = updateCliente;
exports.deleteCliente = deleteCliente;
exports.selectCliente = selectCliente;
exports.selectClienteId = selectClienteId;
const dotenv_1 = __importDefault(require("dotenv"));
const Validacoes_1 = require("../functions/Validacoes");
const Excepitions_1 = require("../messaging/Excepitions");
dotenv_1.default.config();
function createCliente(prisma, cliente) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const bCnpjCpf = yield (0, Validacoes_1.getValidaCpfCnpj)(cliente.cnpjcpf);
            if (!bCnpjCpf) {
                return { status: 400, msg: 'Este CnpjCpf é inválido. Favor verifique.' };
            }
            const response = yield prisma.$transaction((prismaTransaction) => __awaiter(this, void 0, void 0, function* () {
                yield prismaTransaction.tbcliente.create({
                    data: {
                        cnpjcpf: cliente.cnpjcpf.replace(/[^\d]+/g, ''),
                        razaosocial: cliente.razaosocial,
                        fantasia: cliente.fantasia,
                        datacriacao: new Date(cliente.datacriacao),
                        responsavel: cliente.responsavel,
                        situacao: cliente.situacao,
                        email: cliente.email,
                        telefone: cliente.telefone,
                        celular: cliente.celular,
                        estadoid: cliente.estadoid,
                        cidadeid: cliente.cidadeid,
                        cep: cliente.cep,
                        logradouro: cliente.logradouro,
                        numero: cliente.numero,
                        bairro: cliente.bairro,
                        complemento: cliente.complemento,
                        datacadastro: new Date()
                    }
                });
                return { status: 200, msg: 'Novo cliente cadastrado com sucesso.' };
            }));
            return response;
        }
        catch (error) {
            if (error instanceof Error) {
                const tratamento = yield (0, Excepitions_1.tratamentoError)(error);
                return { status: tratamento.status, msg: tratamento.msg };
            }
            return { status: 500, msg: 'Houve um erro crítico no sistema' };
        }
        finally {
            yield prisma.$disconnect();
        }
        ;
    });
}
;
function updateCliente(prisma, cliente, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const bCnpjCpf = yield (0, Validacoes_1.getValidaCpfCnpj)(cliente.cnpjcpf);
            if (!bCnpjCpf) {
                return { status: 400, msg: 'Este CnpjCpf é inválido. Favor verifique.' };
            }
            const response = yield prisma.$transaction((prismaTransaction) => __awaiter(this, void 0, void 0, function* () {
                yield prismaTransaction.tbcliente.update({
                    where: { id: id },
                    data: {
                        cnpjcpf: cliente.cnpjcpf.replace(/[^\d]+/g, ''),
                        razaosocial: cliente.razaosocial,
                        fantasia: cliente.fantasia,
                        datacriacao: new Date(cliente.datacriacao),
                        responsavel: cliente.responsavel,
                        situacao: cliente.situacao,
                        email: cliente.email,
                        telefone: cliente.telefone,
                        celular: cliente.celular,
                        estadoid: cliente.estadoid,
                        cidadeid: cliente.cidadeid,
                        cep: cliente.cep,
                        logradouro: cliente.logradouro,
                        numero: cliente.numero,
                        bairro: cliente.bairro,
                        complemento: cliente.complemento
                    }
                });
                return { status: 200, msg: 'Cliente atualizado com sucesso.' };
            }));
            return response;
        }
        catch (error) {
            const tratamento = yield (0, Excepitions_1.tratamentoError)(error);
            return tratamento;
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
;
function deleteCliente(prisma, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield prisma.$transaction((prismaTransaction) => __awaiter(this, void 0, void 0, function* () {
                const response = yield prismaTransaction.tbcontrato.findUnique({
                    where: {
                        id: id,
                        status: 1
                    }
                });
                if (response) {
                    return { status: 400, msg: 'Não é possível excluir um cliente com contrato ativo.' };
                }
                ;
                yield prismaTransaction.tbcliente.update({
                    where: { id: id, situacao: 1 },
                    data: {
                        situacao: 0
                    }
                });
                return { status: 200, msg: 'Cliente deletado com sucesso.' };
            }));
            return result;
        }
        catch (error) {
            const tratamento = yield (0, Excepitions_1.tratamentoError)(error);
            return tratamento;
        }
        finally {
            yield prisma.$disconnect();
        }
        ;
    });
}
;
function selectCliente(prisma_1) {
    return __awaiter(this, arguments, void 0, function* (prisma, page = 1, pageSize = 10) {
        try {
            const skip = (page - 1) * pageSize;
            const take = pageSize;
            const total = yield prisma.tbcliente.count();
            const response = yield prisma.tbcliente.findMany({
                where: {
                    situacao: 1
                },
                skip: skip,
                take: take,
                orderBy: { razaosocial: 'asc' },
                include: { estado: true, cidade: true }
            });
            if (response) {
                const clientes = response.map((c) => {
                    return {
                        id: c.id,
                        cnpjcpf: c.cnpjcpf,
                        razaosocial: c.razaosocial,
                        fantasia: c.fantasia,
                        datacriacao: c.datacriacao,
                        responsavel: c.responsavel,
                        situacao: c.situacao,
                        email: c.email,
                        telefone: c.telefone,
                        celular: c.celular,
                        estadoid: c.estadoid,
                        cidadeid: c.cidadeid,
                        cep: c.cep,
                        logradouro: c.logradouro,
                        numero: c.numero,
                        bairro: c.bairro,
                        complemento: c.complemento,
                        datacadastro: c.datacadastro,
                        cidade: {
                            id: c.cidade.id,
                            nome: c.cidade.nome,
                            estadoid: c.cidade.estadoid,
                            codigoibge: c.cidade.codigoibge,
                            estado: {
                                id: c.estado.id,
                                nome: c.estado.nome,
                                uf: c.estado.uf,
                                pais: c.estado.pais
                            }
                        }
                    };
                });
                return { data: clientes, total: total, page: page, pageSize: pageSize };
            }
            return { data: [], total: 0, page: page, pageSize: pageSize };
        }
        catch (error) {
            return { data: [], total: 0, page: page, pageSize: pageSize };
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
function selectClienteId(prisma, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield prisma.tbcliente.findUnique({
                where: {
                    id: id,
                    situacao: 1
                },
                include: {
                    estado: true,
                    cidade: true
                }
            });
            if (!response) {
                return null;
            }
            const cliente = {
                id: response.id,
                cnpjcpf: response.cnpjcpf,
                razaosocial: response.razaosocial,
                fantasia: response.fantasia,
                datacriacao: response.datacriacao,
                responsavel: response.responsavel,
                situacao: response.situacao,
                email: response.email,
                telefone: response.telefone,
                celular: response.celular,
                estadoid: response.estadoid,
                cidadeid: response.cidadeid,
                cep: response.cep,
                logradouro: response.logradouro,
                numero: response.numero,
                bairro: response.bairro,
                complemento: response.complemento,
                datacadastro: response.datacadastro,
                cidade: {
                    id: response.cidade.id,
                    nome: response.cidade.nome,
                    estadoid: response.cidade.estadoid,
                    codigoibge: response.cidade.codigoibge,
                    estado: {
                        id: response.estado.id,
                        nome: response.estado.nome,
                        uf: response.estado.uf,
                        pais: response.estado.pais
                    }
                }
            };
            return cliente;
        }
        catch (error) {
            return null;
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
;
//# sourceMappingURL=ClienteController.js.map