import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UsuarioLogadoDTO } from '../model/Interfaces';

const secretkey = '?xQn1pCMCv';

export const gerarToken = (usuario: UsuarioLogadoDTO): string => {
    const token = jwt.sign({ usuario }, secretkey, { expiresIn: '1h' }); 
    return token;
};

export const compararSenha = async (senha: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(senha, hash);
};