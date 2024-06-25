import { Decimal } from "@prisma/client/runtime/library";

//Interface de dados do objeto de estado
export interface EstadoDTO {
    nome: string;
    uf: string;
    pais: string;
}

export interface reqEstadoDTO {
    id: number;
    nome: string;
    uf: string;
    pais: string;
}

//Interface de dados do objeto de cidade
export interface CidadeDTO {
    nome: string;
    estadoid: number;
    codigoibge: number;
}

export interface reqCidadeDTO {
    id: number;
    nome: string;
    estadoid: number;
    codigoibge: number;
    estado: reqEstadoDTO;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
}

//Interface de dados do objeto de Cliente
export interface ClienteDTO {
    cnpjcpf: string;
    razaosocial: string;
    fantasia?: string;
    datacriacao: string;
    responsavel?: string;
    situacao: number; 
    email: string;
    telefone?: string;
    celular?: string;
    estadoid: number;
    cidadeid: number;
    cep?: string;
    logradouro?: string;
    numero?: number;
    bairro?: string;
    complemento?: string;
    datacadastro: string;
}

export interface reqClienteDTO {
    id: number;
    cnpjcpf: string;
    razaosocial: string;
    fantasia?: string | null;
    datacriacao: Date;
    responsavel?: string | null;
    situacao: number; 
    email: string;
    telefone?: string | null;
    celular?: string | null;
    estadoid: number;
    cidadeid: number;
    cep?: string | null;
    logradouro?: string | null;
    numero?: number | null;
    bairro?: string | null;
    complemento?: string | null;
    datacadastro: Date;
    cidade: reqCidadeDTO;
}

export interface ContratoDTO {
    contrato: number;
    clienteid: number;
    dtinicio: Date;
    qtdmeses: number;
    dttermino: Date;
    valor: Decimal;
    valormensal: Decimal;
    responsavel: string;
    dtcadastro: Date;
    cedente: string;
    cessionaria: string;
    descricao: string;
    status: number;
    dtassinatura: Date;
    dtatualizacao: Date;
}

export interface reqContratoDTO {
    id: number;
    contrato: number;
    clienteid: number;
    dtinicio: Date;
    qtdmeses: number;
    dttermino: Date;
    valor: Decimal;
    valormensal: Decimal;
    responsavel: string;
    dtcadastro: Date;
    cedente: string;
    cessionaria: string;
    descricao: string;
    status: number;
    dtassinatura: Date;
    dtatualizacao: Date;
    cliente: reqClienteDTO;
}