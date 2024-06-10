import { PrismaClient } from "@prisma/client";
import { publicCidades } from "./execucao/Cidades";
import { publicEstados } from "./execucao/Estados";


const prisma = new PrismaClient();

async function main() {
    const publicarEstado = false;
    const publicarCidade = true;
    if(publicarEstado){ await publicEstados() };
    if(publicarCidade){ await publicCidades() };
};

main().catch(e => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});