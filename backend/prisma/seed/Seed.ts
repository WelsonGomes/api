import { PrismaClient } from "@prisma/client";
import fs from 'fs/promises';

const prisma = new PrismaClient();

async function main() {
    const path = require('path');
    const filePath = path.join(__dirname, 'arquivo', 'Estado.txt');
    const data = await fs.readFile(filePath, 'utf-8');
    const estados = JSON.parse(data);
    for(const e of estados){
        await prisma.tbestado.create({
            data: e
        });
    };
    console.log('Finalizado a criação dos estados.');
};

main().catch(e => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});