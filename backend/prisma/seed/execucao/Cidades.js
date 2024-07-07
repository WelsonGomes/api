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
exports.publicCidades = publicCidades;
const axios_1 = __importDefault(require("axios"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function publicCidades() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Conectando com API do governo...');
            const response = yield axios_1.default.get('https://servicodados.ibge.gov.br/api/v1/localidades/municipios');
            const cidades = response.data;
            const estados = yield prisma.tbestado.findMany({ orderBy: { id: 'asc' } });
            console.log('Mapeando as cidades com os estados para montar os JSON...');
            const cidadesProcessadas = cidades.map((cidade) => {
                const estado = estados.find(estado => estado.uf === cidade.microrregiao.mesorregiao.UF.sigla);
                return {
                    nome: cidade.nome,
                    estadoid: estado === null || estado === void 0 ? void 0 : estado.id,
                    codigoibge: cidade.id
                };
            });
            console.log('Processando inserção dos dados no banco...');
            cidadesProcessadas.sort((a, b) => a.nome.localeCompare(b.nome));
            for (const c of cidadesProcessadas) {
                yield prisma.tbcidade.create({
                    data: c
                });
            }
            ;
            console.log('Finalizando operação...');
            return { retorno: true };
        }
        catch (error) {
            console.log(error);
            return { retorno: false };
        }
    });
}
;
//# sourceMappingURL=Cidades.js.map