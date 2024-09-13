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
    console.log('Configurando conexão do prisma');
    const dbhost = process.env.DATABASE_HOST;
    const dbname = process.env.DATABASE_NAME;
    const dbport = process.env.DATABASE_PORT;
    const dbuser = process.env.DATABASE_USER;
    const dbpassword = process.env.DATABASE_PASSWORD;
    const url = `postgresql://${dbuser}:${dbpassword}@${dbhost}:${dbport}/${dbname}?schema=${schema}`;
    console.log('Cliente para comunicação ' + schema);
    const prisma = new client_1.PrismaClient({
        datasources: {
            db: { url }
        }
    });
    try {
        prisma.$connect(); // Tente conectar explicitamente ao banco de dados
        console.log("Conexão com o banco de dados estabelecida com sucesso");
    }
    catch (err) {
        console.error("Erro ao conectar ao banco de dados:", err);
    }
    return prisma;
}
;
//# sourceMappingURL=Conn.js.map