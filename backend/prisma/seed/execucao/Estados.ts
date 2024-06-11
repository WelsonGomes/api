import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function publicEstados(): Promise<{retorno: boolean}> {
    try {
        console.log('Montando JSON dos estados para inserir...');
        const estados = [
            {"nome": "Acre", "uf": "AC", "pais": "Brasil"},
            {"nome": "Alagoas", "uf": "AL", "pais": "Brasil"},
            {"nome": "Amapá", "uf": "AP", "pais": "Brasil"},
            {"nome": "Amazonas", "uf": "AM", "pais": "Brasil"},
            {"nome": "Bahia", "uf": "BA", "pais": "Brasil"},
            {"nome": "Ceará", "uf": "CE", "pais": "Brasil"},
            {"nome": "Distrito Federal", "uf": "DF", "pais": "Brasil"},
            {"nome": "Espírito Santo", "uf": "ES", "pais": "Brasil"},
            {"nome": "Goiás", "uf": "GO", "pais": "Brasil"},
            {"nome": "Maranhão", "uf": "MA", "pais": "Brasil"},
            {"nome": "Mato Grosso", "uf": "MT", "pais": "Brasil"},
            {"nome": "Mato Grosso do Sul", "uf": "MS", "pais": "Brasil"},
            {"nome": "Minas Gerais", "uf": "MG", "pais": "Brasil"},
            {"nome": "Pará", "uf": "PA", "pais": "Brasil"},
            {"nome": "Paraíba", "uf": "PB", "pais": "Brasil"},
            {"nome": "Paraná", "uf": "PR", "pais": "Brasil"},
            {"nome": "Pernambuco", "uf": "PE", "pais": "Brasil"},
            {"nome": "Piauí", "uf": "PI", "pais": "Brasil"},
            {"nome": "Rio de Janeiro", "uf": "RJ", "pais": "Brasil"},
            {"nome": "Rio Grande do Norte", "uf": "RN", "pais": "Brasil"},
            {"nome": "Rio Grande do Sul", "uf": "RS", "pais": "Brasil"},
            {"nome": "Rondônia", "uf": "RO", "pais": "Brasil"},
            {"nome": "Roraima", "uf": "RR", "pais": "Brasil"},
            {"nome": "Santa Catarina", "uf": "SC", "pais": "Brasil"},
            {"nome": "São Paulo", "uf": "SP", "pais": "Brasil"},
            {"nome": "Sergipe", "uf": "SE", "pais": "Brasil"},
            {"nome": "Tocantins", "uf": "TO", "pais": "Brasil"}
        ];
        console.log('Processando inserção dos dados no banco...');
        for(const e of estados){
            await prisma.tbestado.create({
                data: e
            });
        };
        console.log('Finalizando operação...');
        return { retorno: true };
    } catch (error) {
        return { retorno: false };
    }
}

export { publicEstados };