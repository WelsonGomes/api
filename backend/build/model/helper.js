"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.converteUsuario = converteUsuario;
function converteUsuario(usuario) {
    const usuarioLogadoDTO = {
        id: usuario.id,
        pessoaid: usuario.pessoaid,
        nome: usuario.pessoa.nome + ' ' + usuario.pessoa.sobrenome,
        permissao: usuario.permissao
    };
    return usuarioLogadoDTO;
}
//# sourceMappingURL=helper.js.map