import axios from "axios";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function publicCidades(): Promise<{retorno: boolean}> {
    try {
        console.log('Conectando com API do governo...');
        const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/municipios');
        const cidades = response.data;
        const estados = await prisma.tbestado.findMany({ orderBy: { id: 'asc' }});
        console.log('Mapeando as cidades com os estados para montar os JSON...');
        const cidadesProcessadas = cidades.map((cidade: any) => {
            const estado = estados.find(estado => estado.uf === cidade.microrregiao.mesorregiao.UF.sigla);
            return {
                nome: cidade.nome,
                estadoid: estado?.id,
                codigoibge: cidade.id
            };
        });
        console.log('Processando inserção dos dados no banco...');
        cidadesProcessadas.sort((a: any, b: any) => a.nome.localeCompare(b.nome));
        for(const c of cidadesProcessadas){
            await prisma.tbcidade.create({
                data: c
            });
        };
        console.log('Finalizando operação...');
        return { retorno: true };
    } catch (error) {
        console.log(error);
        return { retorno: false };
    }
};

export { publicCidades };