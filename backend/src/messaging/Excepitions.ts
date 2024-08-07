import { Prisma } from '@prisma/client';

function extractErrorDetails(errorString: string): { code: string, message: string, detail?: string } {
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

async function tratamentoError(error: any): Promise<{status: number, msg: string}> {
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
            case 'P2025':{
                const meta = error.meta;
                const detail = meta?.detail;
                return { status: 400, msg: `Este registro não existe na base de dados. Detalhes: ${detail}` };
            }
        };
        return {status: 500, msg: `Erro no servidor: ${error.message}`};
    } else if(error instanceof Prisma.PrismaClientInitializationError){
        return {status: 500, msg: 'Houve um erro no servidor, tente novamente em alguns instantes.'};
    }
    return {status: 400, msg: response.message};
};

export { tratamentoError };