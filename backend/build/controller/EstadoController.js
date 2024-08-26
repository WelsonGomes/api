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
exports.createEstado = createEstado;
exports.updateEstado = updateEstado;
exports.deleteEstado = deleteEstado;
exports.selectEstado = selectEstado;
exports.selectEstadoId = selectEstadoId;
const dotenv_1 = __importDefault(require("dotenv"));
const Excepitions_1 = require("../messaging/Excepitions");
dotenv_1.default.config();
function createEstado(prisma, estado) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield prisma.$transaction((primaTransaction) => __awaiter(this, void 0, void 0, function* () {
                yield primaTransaction.tbestado.create({ data: estado });
                return { status: 200, msg: 'Novo estado cadastrado com sucesso.' };
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
function updateEstado(prisma, estado, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield prisma.$transaction((prismaTransaction) => __awaiter(this, void 0, void 0, function* () {
                const response = yield prismaTransaction.tbestado.update({
                    where: { id: id },
                    data: {
                        nome: estado.nome,
                        uf: estado.uf,
                        pais: estado.pais
                    }
                });
                if (response) {
                    return { status: 200, msg: 'Atualizado os dados do estado.' };
                }
                return { status: 500, msg: 'Houve uma falha ao alterar o estado.' };
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
function deleteEstado(prisma, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = prisma.$transaction((prismaTransaction) => __awaiter(this, void 0, void 0, function* () {
                const estado = yield prismaTransaction.tbestado.findUnique({ where: { id: id } });
                if (estado) {
                    yield prisma.tbestado.delete({ where: { id: id } });
                    return { status: 200, msg: 'Estado deletado com sucesso.' };
                }
                return { status: 500, msg: 'Não foi possivel deletar o estado.' };
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
function selectEstado(prisma) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const estados = yield prisma.tbestado.findMany({ orderBy: [{ id: 'asc' }] });
            if (estados) {
                const reqestadosDTO = estados.map((e) => {
                    return {
                        id: e.id,
                        nome: e.nome,
                        uf: e.uf,
                        pais: e.pais
                    };
                });
                return reqestadosDTO;
            }
            ;
            return [];
        }
        catch (error) {
            if (error instanceof Error) {
                const tratamento = yield (0, Excepitions_1.tratamentoError)(error);
                return [];
            }
            return [];
        }
        finally {
            yield prisma.$disconnect();
        }
        ;
    });
}
;
function selectEstadoId(prisma, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const estado = yield prisma.tbestado.findUnique({ where: { id: id } });
            if (estado) {
                const responseDTO = {
                    id: estado.id,
                    nome: estado.nome,
                    uf: estado.uf,
                    pais: estado.pais
                };
                return responseDTO;
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
//# sourceMappingURL=EstadoController.js.map