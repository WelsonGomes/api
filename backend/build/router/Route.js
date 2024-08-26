"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const router = express_1.default.Router();
const Excepitions_1 = require("../messaging/Excepitions");
const EstadoController_1 = require("../controller/EstadoController");
const CidadeController_1 = require("../controller/CidadeController");
const ClienteController_1 = require("../controller/ClienteController");
const ContratoController_1 = __importDefault(require("../controller/ContratoController"));
const TipoFisicoController_1 = __importDefault(require("../controller/TipoFisicoController"));
const NivelAtividadeController_1 = __importDefault(require("../controller/NivelAtividadeController"));
const ObjetivoController_1 = __importDefault(require("../controller/ObjetivoController"));
const ContatoController_1 = __importDefault(require("../controller/ContatoController"));
const PessoaController_1 = __importDefault(require("../controller/PessoaController"));
dotenv_1.default.config();
/************************ROTAS DO OBJETO ESTADO**************************/
//rota para cadastrar um novo estado
router.post('/Estado', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const estadoDTO = req.body;
        const novoEstado = yield (0, EstadoController_1.createEstado)(req.prisma, estadoDTO);
        return res.status(novoEstado.status).json({ msg: novoEstado.msg });
    }
    catch (error) {
        if (error instanceof Error) {
            const tratamento = yield (0, Excepitions_1.tratamentoError)(error);
            return { status: tratamento.status, msg: tratamento.msg };
        }
        return { status: 500, msg: 'Houve um erro crítico no sistema' };
    }
    ;
}));
//rota para atualizar um estado
router.put('/Estado', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        const estadoDTO = req.body;
        const atualizaEstado = yield (0, EstadoController_1.updateEstado)(req.prisma, estadoDTO, parseInt(id));
        return res.status(atualizaEstado.status).json({ msg: atualizaEstado.msg });
    }
    catch (error) {
        if (error instanceof Error) {
            const tratamento = yield (0, Excepitions_1.tratamentoError)(error);
            return { status: tratamento.status, msg: tratamento.msg };
        }
        return { status: 500, msg: 'Houve um erro crítico no sistema' };
    }
    ;
}));
//rota para deletar um estado
router.delete('/Estado', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        const deletarEstado = yield (0, EstadoController_1.deleteEstado)(req.prisma, parseInt(id));
        return res.status(deletarEstado.status).json({ msg: deletarEstado.msg });
    }
    catch (error) {
        if (error instanceof Error) {
            const tratamento = yield (0, Excepitions_1.tratamentoError)(error);
            return { status: tratamento.status, msg: tratamento.msg };
        }
        return { status: 500, msg: 'Houve um erro crítico no sistema' };
    }
    ;
}));
//rota para selecionar os estados ou um especificado pelo filtro
router.get('/Estado', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        let estados;
        if (parseInt(id) > 0) {
            estados = yield (0, EstadoController_1.selectEstadoId)(req.prisma, parseInt(id));
        }
        else {
            estados = yield (0, EstadoController_1.selectEstado)(req.prisma);
        }
        ;
        if (estados) {
            return res.status(200).json(estados);
        }
        return res.status(200).json({ msg: 'Nenhum registro para mostrar.' });
    }
    catch (error) {
        if (error instanceof Error) {
            const tratamento = yield (0, Excepitions_1.tratamentoError)(error);
            return { status: tratamento.status, msg: tratamento.msg };
        }
        return { status: 500, msg: 'Houve um erro crítico no sistema' };
    }
    ;
}));
/************************ROTAS DO OBJETO CIDADE**************************/
//rota para cadastrar uma nova cidade
router.post('/Cidade', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cidadeDTO = req.body;
        const novaCidade = yield (0, CidadeController_1.createCidade)(req.prisma, cidadeDTO);
        return res.status(novaCidade.status).json({ msg: novaCidade.msg });
    }
    catch (error) {
        if (error instanceof Error) {
            const tratamento = yield (0, Excepitions_1.tratamentoError)(error);
            return res.status(tratamento.status).json(tratamento.msg);
        }
        return res.status(500).json({ msg: 'Houve uma falha crítica no servidor.' });
    }
    ;
}));
//rota para atualizar os dados de uma cidade
router.put('/Cidade', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        const cidadeDTO = req.body;
        const atualizaCidade = yield (0, CidadeController_1.updateCidade)(req.prisma, cidadeDTO, parseInt(id));
        return res.status(atualizaCidade.status).json({ msg: atualizaCidade.msg });
    }
    catch (error) {
        if (error instanceof Error) {
            const tratamento = yield (0, Excepitions_1.tratamentoError)(error);
            return res.status(tratamento.status).json(tratamento.msg);
        }
        return res.status(500).json({ msg: 'Houve uma falha crítica no servidor.' });
    }
    ;
}));
//rota para deletar uma cidade
router.delete('/Cidade', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        const deletarCidade = yield (0, CidadeController_1.deleteCidade)(req.prisma, parseInt(id));
        return res.status(deletarCidade.status).json({ msg: deletarCidade.msg });
    }
    catch (error) {
        if (error instanceof Error) {
            const tratamento = yield (0, Excepitions_1.tratamentoError)(error);
            return res.status(tratamento.status).json(tratamento.msg);
        }
        return res.status(500).json({ msg: 'Houve uma falha crítica no servidor.' });
    }
    ;
}));
//rota para selecionar todas as cidades ou a especificada no filtro
router.get('/Cidade', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        const page = req.query.page;
        const pageSize = req.query.pageSize;
        let cidades;
        if (parseInt(id) > 0) {
            cidades = yield (0, CidadeController_1.selectCidadeId)(req.prisma, parseInt(id));
        }
        else {
            cidades = yield (0, CidadeController_1.selectCidade)(req.prisma, parseInt(page), parseInt(pageSize));
        }
        if (cidades) {
            return res.status(200).json(cidades);
        }
        return res.status(200).json({ msg: 'Não foi possivel localizar a(s) cidade(s).' });
    }
    catch (error) {
        if (error instanceof Error) {
            const tratamento = yield (0, Excepitions_1.tratamentoError)(error);
            return res.status(tratamento.status).json(tratamento.msg);
        }
        return res.status(500).json({ msg: 'Houve uma falha crítica no servidor.' });
    }
    ;
}));
/************************ROTAS DO OBJETO CLIENTE**************************/
//rota para cadastrar um cliente
router.post('/Cliente', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cliente = req.body;
        const novoCliente = yield (0, ClienteController_1.createCliente)(req.prisma, cliente);
        return res.status(novoCliente.status).json({ msg: novoCliente.msg });
    }
    catch (error) {
        if (error instanceof Error) {
            const tratamento = yield (0, Excepitions_1.tratamentoError)(error);
            return res.status(tratamento.status).json(tratamento.msg);
        }
        return res.status(500).json({ msg: 'Houve uma falha crítica no servidor.' });
    }
    ;
}));
//rota para atualizar os dados de um cliente
router.put('/Cliente', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        const cliente = req.body;
        const atualizaCliente = yield (0, ClienteController_1.updateCliente)(req.prisma, cliente, parseInt(id));
        return res.status(atualizaCliente.status).json({ msg: atualizaCliente.msg });
    }
    catch (error) {
        if (error instanceof Error) {
            const tratamento = yield (0, Excepitions_1.tratamentoError)(error);
            return res.status(tratamento.status).json(tratamento.msg);
        }
        return res.status(500).json({ msg: 'Houve uma falha crítica no servidor.' });
    }
    ;
}));
//rota para deletar o cliente selecionado
router.delete('/Cliente', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        const cliente = yield (0, ClienteController_1.deleteCliente)(req.prisma, parseInt(id));
        return res.status(cliente.status).json({ msg: cliente.msg });
    }
    catch (error) {
        if (error instanceof Error) {
            const tratamento = yield (0, Excepitions_1.tratamentoError)(error);
            return res.status(tratamento.status).json(tratamento.msg);
        }
        return res.status(500).json({ msg: 'Houve uma falha crítica no servidor.' });
    }
    ;
}));
//rota para buscar todos os clientes ou com o filtro do id do cliente
router.get('/Cliente', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        const page = req.query.page;
        const pageSize = req.query.pageSize;
        if (parseInt(id) > 0) {
            const cliente = yield (0, ClienteController_1.selectClienteId)(req.prisma, parseInt(id));
            if (cliente) {
                return res.status(200).json(cliente);
            }
            return res.status(200).json({ msg: 'Nenhuma informação para exibir.' });
        }
        const clientes = yield (0, ClienteController_1.selectCliente)(req.prisma, parseInt(page), parseInt(pageSize));
        if (clientes.data.length > 0) {
            return res.status(200).json(clientes);
        }
        return res.status(200).json({ msg: 'Nenhuma informação para exibir.' });
    }
    catch (error) {
        if (error instanceof Error) {
            const tratamento = yield (0, Excepitions_1.tratamentoError)(error);
            return res.status(tratamento.status).json(tratamento.msg);
        }
        return res.status(500).json({ msg: 'Houve uma falha crítica no servidor.' });
    }
    ;
}));
/************************ROTAS DO OBJETO CONTRATO**************************/
router.post('/Contrato', ContratoController_1.default.createContrato);
router.put('/Contrato', ContratoController_1.default.updateContrato);
router.delete('/Contrato', ContratoController_1.default.deleteContrato);
router.get('/Contrato', ContratoController_1.default.selectContrato);
/************************ROTAS DO OBJETO TIPO FISICO**************************/
router.post('/Tipofisico', TipoFisicoController_1.default.createTipofisico);
router.put('/Tipofisico', TipoFisicoController_1.default.updateTipofisico);
router.delete('/Tipofisico', TipoFisicoController_1.default.deleteTipofisico);
router.get('/Tipofisico', TipoFisicoController_1.default.selectTipofisico);
/************************ROTAS DO OBJETO NIVEL ATIVIDADE**************************/
router.post('/Nivelatividade', NivelAtividadeController_1.default.createNivelatividade);
router.put('/Nivelatividade', NivelAtividadeController_1.default.updateNivelatividade);
router.delete('/Nivelatividade', NivelAtividadeController_1.default.deleteNivelatividade);
router.get('/Nivelatividade', NivelAtividadeController_1.default.selectNivelatividade);
/************************ROTAS DO OBJETO OBJETIVO**************************/
router.post('/Objetivo', ObjetivoController_1.default.createObjetivo);
router.put('/Objetivo', ObjetivoController_1.default.updateObjetivo);
router.delete('/Objetivo', ObjetivoController_1.default.deleteObjetivo);
router.get('/Objetivo', ObjetivoController_1.default.selectObjetivo);
/************************ROTAS DO OBJETO CONTATO**************************/
router.post('/Contato', ContatoController_1.default.createContato);
router.put('/Contato', ContatoController_1.default.updateContato);
router.delete('/Contato', ContatoController_1.default.deleteContato);
router.get('/Contato', ContatoController_1.default.selectContato);
/************************ROTAS DO OBJETO PROFESSOR**************************/
router.post('/Professor', PessoaController_1.default.createPessoa);
router.put('/Professor', PessoaController_1.default.updatePessoa);
router.delete('/Professor', PessoaController_1.default.deletePessoa);
router.get('/Professor', PessoaController_1.default.selectPessoa);
module.exports = router;
//# sourceMappingURL=Route.js.map