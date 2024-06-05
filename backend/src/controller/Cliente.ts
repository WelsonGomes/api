import { PrismaClient } from "@prisma/client";
import { EstadoDTO } from "../model/Interfaces";

const prisma = new PrismaClient();

async function createEstado(estado: EstadoDTO): Promise<EstadoDTO> {

    const novoEstadoDTO = estado;
    return novoEstadoDTO;
}

export { createEstado };