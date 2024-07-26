import { PrismaClient } from "@prisma/client";
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function criarCheck(): Promise<boolean> {
    try {
        // Caminho para o arquivo SQL
        const filePath = path.join(__dirname, '../arquivo/check_situacao_pessoa.sql');
        
        // Lê o conteúdo do arquivo SQL
        const sql = fs.readFileSync(filePath, 'utf8');

        // Executa o SQL lido
        await prisma.$executeRawUnsafe(sql);

        console.log('SQL executado com sucesso.');
        return true;
    } catch (error) {
        console.error('Erro ao executar o SQL:', error);
        return false;
    } finally {
        await prisma.$disconnect();
    }
}

export { criarCheck };