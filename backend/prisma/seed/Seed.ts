import { PrismaClient } from "@prisma/client";
import { publicEstados } from "./execucao/Estados";
import { publicCidades } from "./execucao/Cidades";
import { criarCheck } from "./execucao/CriarChecks";

const prisma = new PrismaClient();

async function main() {
    const publicarEstado = false;
    const publicarCidade = true;
    const restricao = false;
    if(publicarEstado){ await publicEstados() };
    if(publicarCidade){ await publicCidades() };
    if(restricao){ await criarCheck() };
};

main().catch(e => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});