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
exports.createCidade = createCidade;
exports.updateCidade = updateCidade;
exports.deleteCidade = deleteCidade;
exports.selectCidade = selectCidade;
exports.selectCidadeId = selectCidadeId;
const dotenv_1 = __importDefault(require("dotenv"));
const Excepitions_1 = require("../messaging/Excepitions");
dotenv_1.default.config();
function createCidade(prisma, cidade) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield prisma.$transaction((prismaTransaction) => __awaiter(this, void 0, void 0, function* () {
                yield prismaTransaction.tbcidade.create({ data: cidade });
                return { status: 200, msg: 'Nova cidade cadastrada com sucesso.' };
            }));
            return result;
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
function updateCidade(prisma, cidade, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield prisma.$transaction((prismaTransaction) => __awaiter(this, void 0, void 0, function* () {
                const response = yield prisma.tbcidade.update({
                    where: { id: id },
                    data: cidade
                });
                return { status: 200, msg: 'Atualização de cidade com sucesso.' };
            }));
            return result;
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
function deleteCidade(prisma, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield prisma.$transaction((prismaTransaction) => __awaiter(this, void 0, void 0, function* () {
                const response = yield prisma.tbcidade.delete({ where: { id: id } });
                if (response) {
                    return { status: 200, msg: 'Cidade deletada com sucesso.' };
                }
                return { status: 400, msg: 'Houve um erro ao deletar a cidade.' };
            }));
            return result;
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
function selectCidade(prisma_1) {
    return __awaiter(this, arguments, void 0, function* (prisma, page = 1, pageSize = 10) {
        try {
            const skip = (page - 1) * pageSize;
            const take = pageSize;
            const total = yield prisma.tbcidade.count();
            const response = yield prisma.tbcidade.findMany({
                skip: skip,
                take: take,
                orderBy: { nome: 'asc' },
                include: { estado: true }
            });
            if (response) {
                const reqcidadeDTO = response.map((c) => {
                    return {
                        id: c.id,
                        nome: c.nome,
                        estadoid: c.estadoid,
                        codigoibge: c.codigoibge,
                        estado: {
                            id: c.estado.id,
                            nome: c.estado.nome,
                            uf: c.estado.uf,
                            pais: c.estado.pais
                        }
                    };
                });
                return { data: reqcidadeDTO, total: total, page: page, pageSize: pageSize };
            }
            ;
            return { data: [], total: 0, page: page, pageSize: pageSize };
        }
        catch (error) {
            if (error instanceof Error) {
                const tratamento = yield (0, Excepitions_1.tratamentoError)(error);
                return { data: [], total: 0, page: page, pageSize: pageSize };
            }
            return { data: [], total: 0, page: page, pageSize: pageSize };
        }
        finally {
            yield prisma.$disconnect();
        }
        ;
    });
}
;
function selectCidadeId(prisma, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield prisma.tbcidade.findUnique({
                where: { id: id },
                include: { estado: true }
            });
            if (response) {
                const reqcidadeDTO = {
                    id: response.id,
                    nome: response.nome,
                    estadoid: response.estadoid,
                    codigoibge: response.codigoibge,
                    estado: {
                        id: response.estado.id,
                        nome: response.estado.nome,
                        uf: response.estado.uf,
                        pais: response.estado.pais
                    }
                };
                return reqcidadeDTO;
            }
            ;
            return null;
        }
        catch (error) {
            if (error instanceof Error) {
                const tratamento = yield (0, Excepitions_1.tratamentoError)(error);
                return null;
            }
            return null;
        }
        finally {
            yield prisma.$disconnect();
        }
        ;
    });
}
;
//# sourceMappingURL=CidadeController.js.map