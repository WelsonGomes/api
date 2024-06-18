import { Prisma } from '@prisma/client';

function extractErrorDetails(errorString: string): { code: string, message: string, detail?: string } {
    const codeMatch = errorString.match(/code: "(\d{5})"/);
    const messageMatch = errorString.match(/PostgresError {([^}]+)"/);
    const detailMatch = errorString.match(/detail: Some\("([^"]+)"\)/);

    let message = '';

if (messageMatch) {
    const extractedMessage = messageMatch[1];
    console.log(extractedMessage); // Exibe a mensagem extraída

    const cleanedMessage = extractedMessage.replace(/["\\]/g, '');
    console.log(cleanedMessage); // Exibe a mensagem após remoção de caracteres indesejados

    const matchedMessage = cleanedMessage.match(/message:([^,]+)/);
    console.log(matchedMessage); // Exibe o resultado do match

    if (matchedMessage) {
        message = matchedMessage[1]; // Atribui o valor extraído
    } else {
        console.error('Padrão de mensagem não encontrado.');
    }
}

    return {
        code: codeMatch ? codeMatch[1] : 'Unknown code',
        message: message || 'Unknown message',
        detail: detailMatch ? detailMatch[1] : undefined
    };
};

async function tratamentoError(error: Error): Promise<{status: number, msg: string}> {
    const response = extractErrorDetails(error.message);
    if(error instanceof Prisma.PrismaClientKnownRequestError){
        switch (error.code){
            case 'P2002': {
                const meta = error.meta;
                const target = meta?.target;
                return {status: 400, msg: `Duplicidade no campo único. O valor para ${target} já existe.`};
            };
            case '23514': {
                const meta = error.meta;
                const detail = meta?.detail;
                return { status: 400, msg: `O valor sendo inserido no campo viola as restrições da tabela. Detalhes: ${detail}` };
            };
        };
        return {status: 500, msg: `Erro no servidor: ${error.message}`};
    } else if(error instanceof Prisma.PrismaClientInitializationError){
        return {status: 500, msg: 'Houve um erro no servidor, tente novamente em alguns instantes.'};
    }
    return {status: 400, msg: response.message};
};

export { tratamentoError };