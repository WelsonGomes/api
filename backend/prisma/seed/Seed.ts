import { PrismaClient } from "@prisma/client";
import { publicEstados } from "./execucao/Estados";
import { publicCidades } from "./execucao/Cidades";
import CriarCheck from "./execucao/CriarChecks";



const prisma = new PrismaClient();

async function main() {
    const publicarEstado = false;
    const publicarCidade = false;
    const criarCheck = true;
    if(publicarEstado){ await publicEstados() };
    if(publicarCidade){ await publicCidades() };
    if(criarCheck){ await CriarCheck() };
};

main().catch(e => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});