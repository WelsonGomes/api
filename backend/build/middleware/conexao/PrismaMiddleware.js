"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaMiddleware = prismaMiddleware;
const dotenv_1 = __importDefault(require("dotenv"));
const Conn_1 = require("./connec/Conn");
dotenv_1.default.config();
function prismaMiddleware(req, res, next) {
    const schema = req.query.schema;
    if (!schema) {
        res.status(400).json({ error: 'Cliente não definido...' });
        return;
    }
    req.prisma = (0, Conn_1.getPrismaClient)(schema);
    next();
}
//# sourceMappingURL=PrismaMiddleware.js.map