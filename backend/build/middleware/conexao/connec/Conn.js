"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClient = getPrismaClient;
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//Configurar cliente no banco de dados para conexão
function getPrismaClient(schema) {
    const url = process.env.BASE_URL + schema;
    return new client_1.PrismaClient({
        datasources: {
            db: {
                url: url
            }
        }
    });
}
;
//# sourceMappingURL=Conn.js.map