import { UsuarioLogadoDTO } from "./Interfaces";

export function converteUsuario(usuario: any): UsuarioLogadoDTO {
    const usuarioLogadoDTO: UsuarioLogadoDTO = {
        id: usuario.id,
        pessoaid: usuario.pessoaid,
        nome: usuario.pessoa.nome + ' ' + usuario.pessoa.sobrenome,
        permissao: usuario.permissao
    };
    return usuarioLogadoDTO;
}