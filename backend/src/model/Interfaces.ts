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
    page: number;
    pageSize: number;
    total: number;
    data: T[];
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
    cidade: reqCidadeDTO | null;
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
    dtatualizacao?: Date | null;
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
    dtatualizacao?: Date | null;
    cliente: reqClienteDTO;
}

export interface EnderecoDTO {
    id: number;
    pessoaid: number;
    cep: string;
    rua: string;
    numero?: string | null;
    cidadeid: number;
    bairro: string;
    estadoid: number;
    complemento: string;
}

export interface TipofisicoDTO {
    id: number | null;
    descricao: string | null;
}

export interface NivelatividadeDTO {
    id: number | null;
    descricao: string | null;
}

export interface ObjetivoDTO {
    id: number | null;
    descricao: string | null;
}

export interface TipopessoaDTO {
    id: number | null;
    descricao: string | null;
}

export interface ContatoDTO {
    id: number;
    pessoaid: number;
    telefone?: string | null;
    celular?: string | null;
    email?: string | null;
}

export interface PessoaDTO {
    id: number;
    codigo: number;
    nome: string;
    sobrenome: string;
    cpf: string;
    datanascimento: Date;
    sexo: number;
    tipofisico?: TipofisicoDTO | null;
    nivelatividade?: NivelatividadeDTO | null;
    objetivo?: ObjetivoDTO | null;
    situacao: number;
    tipopessoa: TipopessoaDTO;
    contato: ContatoDTO[] | null;
    endereco: EnderecoDTO[] | null;
}

export interface UsuarioDTO {
    id: number;
    pessoaid: number;
    permissao: string;
    usuario: string;
    password: string;
    situacao: number;
    dtacadastro: Date;
    pessoa: PessoaDTO | null;
}

export interface UsuarioLogin {
    user: string;
    password: string;
}

export interface UsuarioLogadoDTO {
    id: number;
    pessoaid: number;
    nome: string;
    permissao: string;
}