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