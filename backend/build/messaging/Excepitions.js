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
Object.defineProperty(exports, "__esModule", { value: true });
exports.tratamentoError = tratamentoError;
const client_1 = require("@prisma/client");
function extractErrorDetails(errorString) {
    const codeMatch = errorString.match(/code: "(\d{5})"/);
    const messageMatch = errorString.match(/PostgresError {([^}]+)"/);
    const detailMatch = errorString.match(/detail: Some\("([^"]+)"\)/);
    let message = '';
    if (messageMatch) {
        const extractedMessage = messageMatch[1];
        console.log(extractedMessage);
        const cleanedMessage = extractedMessage.replace(/["\\]/g, '');
        console.log(cleanedMessage);
        const matchedMessage = cleanedMessage.match(/message:([^,]+)/);
        console.log(matchedMessage);
        if (matchedMessage) {
            message = matchedMessage[1];
        }
        else {
            console.error('Padrão de mensagem não encontrado.');
        }
    }
    return {
        code: codeMatch ? codeMatch[1] : 'Unknown code',
        message: message || 'Unknown message',
        detail: detailMatch ? detailMatch[1] : undefined
    };
}
;
function tratamentoError(error) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = extractErrorDetails(error.message);
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            switch (error.code) {
                case 'P2002':
                    {
                        const meta = error.meta;
                        const target = meta === null || meta === void 0 ? void 0 : meta.target;
                        return { status: 400, msg: `Duplicidade no campo único. O valor para ${target} já existe.` };
                    }
                    ;
                case '23514':
                    {
                        const meta = error.meta;
                        const detail = meta === null || meta === void 0 ? void 0 : meta.detail;
                        return { status: 400, msg: `O valor sendo inserido no campo viola as restrições da tabela. Detalhes: ${detail}` };
                    }
                    ;
                case 'P2025': {
                    const meta = error.meta;
                    const detail = meta === null || meta === void 0 ? void 0 : meta.detail;
                    return { status: 400, msg: `Este registro não existe na base de dados. Detalhes: ${detail}` };
                }
            }
            ;
            return { status: 500, msg: `Erro no servidor: ${error.message}` };
        }
        else if (error instanceof client_1.Prisma.PrismaClientInitializationError) {
            return { status: 500, msg: 'Houve um erro no servidor, tente novamente em alguns instantes.' };
        }
        return { status: 400, msg: response.message };
    });
}
;
//# sourceMappingURL=Excepitions.js.map