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
dotenv_1.default.config();
class TipoFisicoController {
    static createTipofisico(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield req.prisma.$transaction((prismaTransaction) => __awaiter(this, void 0, void 0, function* () {
                    return prismaTransaction.tbtipofisico.create({
                        data: {
                            descricao: req.body.descricao
                        }
                    });
                }));
                return res.status(200).json({ msg: 'Novo tipo fisico cadastrado com sucesso.' });
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
    static updateTipofisico(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield req.prisma.$transaction((prismaTransaction) => __awaiter(this, void 0, void 0, function* () {
                    return prismaTransaction.tbtipofisico.update({
                        where: { id: parseInt(req.query.id) },
                        data: {
                            descricao: req.body.descricao
                        }
                    });
                }));
                return res.status(200).json({ msg: 'Tipo fisico atualizado com sucesso.' });
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
    static deleteTipofisico(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield req.prisma.$transaction((prismaTransaction) => __awaiter(this, void 0, void 0, function* () {
                    return prismaTransaction.tbtipofisico.delete({
                        where: { id: parseInt(req.query.id) }
                    });
                }));
                return res.status(200).json({ msg: 'Tipo fisico deletado com sucesso.' });
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
    static selectTipofisico(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.query.id) {
                    const response = yield req.prisma.tbtipofisico.findUnique({ where: { id: parseInt(req.query.id) } });
                    return res.status(200).json(response);
                }
                ;
                return res.status(200).json(yield req.prisma.tbtipofisico.findMany());
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
exports.default = TipoFisicoController;
;
//# sourceMappingURL=TipoFisicoController.js.map