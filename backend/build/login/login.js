"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const auth = __importStar(require("./auth"));
const helper_1 = require("../model/helper");
dotenv_1.default.config();
class Login {
    static validacao(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Fazendo login");
                const { user, password } = req.body;
                const usuario = yield req.prisma.tbusuario.findFirst({ where: { usuario: user, situacao: 1 }, include: { pessoa: true } });
                console.log("Autenticação para o usuário " + (usuario === null || usuario === void 0 ? void 0 : usuario.pessoa.nome));
                if (usuario) {
                    if (yield auth.compararSenha(password, usuario.password)) {
                        const result = (0, helper_1.converteUsuario)(usuario);
                        const token = auth.gerarToken(result);
                        return res.status(200).json(token);
                    }
                    else {
                        return res.status(401).json({ msg: "Usuário ou senha invalido." });
                    }
                }
                else {
                    return res.status(401).json({ msg: "Usuário ou senha invalido." });
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
exports.default = Login;
;
//# sourceMappingURL=login.js.map