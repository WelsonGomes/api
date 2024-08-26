"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const route = require('./router/Route');
const PrismaMiddleware_1 = require("./middleware/conexao/PrismaMiddleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "*" }));
app.use(express_1.default.json());
const port = process.env.SERVICE_PORT;
app.use(PrismaMiddleware_1.prismaMiddleware);
app.use(route);
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
//# sourceMappingURL=server.js.map