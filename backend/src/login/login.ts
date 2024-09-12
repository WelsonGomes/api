import { Request, Response} from 'express';
import { tratamentoError } from '../messaging/Excepitions';
import dotenv from 'dotenv';
import { UsuarioLogin } from '../model/Interfaces';
import * as auth from './auth';
import { converteUsuario } from '../model/helper';
dotenv.config();

export default class Login{
    static async validacao(req: Request, res: Response){
        try{
            console.log("Fazendo login");
            const { user, password } = req.body as UsuarioLogin;
            const usuario = await req.prisma.tbusuario.findFirst({ where: { usuario: user, situacao: 1 }, include: { pessoa: true }});
            console.log("Autenticação para o usuário "+ usuario?.pessoa.nome);
            if(usuario) {
                if(await auth.compararSenha(password, usuario.password)) {
                    const result = converteUsuario(usuario);
                    const token = auth.gerarToken(result);
                    return res.status(200).json(token);
                } else {
                    return res.status(401).json({msg: "Usuário ou senha invalido."});
                }
            } else {
                return res.status(401).json({msg: "Usuário ou senha invalido."});
            }
        } catch (error){
            console.log(error)
            const tratamento = await tratamentoError(error);
            return res.status(tratamento.status).json({msg: tratamento.msg});
        } finally {
            await req.prisma.$disconnect();
        }
    }
};