import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
const router = express.Router();
import { tratamentoError } from '../messaging/Excepitions';
import { createEstado, deleteEstado, selectEstado, selectEstadoId, updateEstado } from '../controller/EstadoController';
import { createCidade, deleteCidade, selectCidade, selectCidadeId, updateCidade } from '../controller/CidadeController';
import { createCliente, deleteCliente, selectCliente, selectClienteId, updateCliente } from '../controller/ClienteController';
import { createContrato } from '../controller/ContratoController';

dotenv.config();

/************************ROTAS DO OBJETO ESTADO**************************/

//rota para cadastrar um novo estado
router.post('/Estado', async (req: Request, res: Response) => {
    try {
        const estadoDTO = req.body;
        const novoEstado = await createEstado(req.prisma, estadoDTO);
        return res.status(novoEstado.status).json({msg: novoEstado.msg});
    } catch (error) {
        if (error instanceof Error) {
            const tratamento = await tratamentoError(error);
            return { status: tratamento.status, msg: tratamento.msg };
        }
        return { status: 500, msg: 'Houve um erro crítico no sistema' };
    };
});

//rota para atualizar um estado
router.put('/Estado', async (req: Request, res: Response) => {
    try {
        const id = req.query.id as string;
        const estadoDTO = req.body;
        const atualizaEstado = await updateEstado(req.prisma,estadoDTO, parseInt(id));
        return res.status(atualizaEstado.status).json({msg: atualizaEstado.msg});
    } catch (error) {
        if (error instanceof Error) {
            const tratamento = await tratamentoError(error);
            return { status: tratamento.status, msg: tratamento.msg };
        }
        return { status: 500, msg: 'Houve um erro crítico no sistema' };
    };
});

//rota para deletar um estado
router.delete('/Estado', async (req: Request, res: Response) => {
    try {
        const id = req.query.id as string;
        const deletarEstado = await deleteEstado(req.prisma,parseInt(id));
        return res.status(deletarEstado.status).json({msg: deletarEstado.msg});
    } catch (error) {
        if (error instanceof Error) {
            const tratamento = await tratamentoError(error);
            return { status: tratamento.status, msg: tratamento.msg };
        }
        return { status: 500, msg: 'Houve um erro crítico no sistema' };
    };
});

//rota para selecionar os estados ou um especificado pelo filtro
router.get('/Estado', async (req: Request, res: Response) => {
    try {
        const id = req.query.id as string;
        let estados;
        if(parseInt(id) > 0){
            estados = await selectEstadoId(req.prisma,parseInt(id));
        } else {
            estados = await selectEstado(req.prisma);
        };
        if(estados){
            return res.status(200).json(estados);
        }
        return res.status(200).json({msg: 'Nenhum registro para mostrar.'});
    } catch (error) {
        if (error instanceof Error) {
            const tratamento = await tratamentoError(error);
            return { status: tratamento.status, msg: tratamento.msg };
        }
        return { status: 500, msg: 'Houve um erro crítico no sistema' };
    };
});

/************************ROTAS DO OBJETO CIDADE**************************/

//rota para cadastrar uma nova cidade
router.post('/Cidade', async (req: Request, res: Response) => {
    try {
        const cidadeDTO = req.body;
        const novaCidade = await createCidade(req.prisma,cidadeDTO);
        return res.status(novaCidade.status).json({msg: novaCidade.msg});
    } catch (error) {
        if (error instanceof Error) {
            const tratamento = await tratamentoError(error);
            return res.status(tratamento.status).json(tratamento.msg);
        }
        return res.status(500).json({msg: 'Houve uma falha crítica no servidor.'});
    };
});

//rota para atualizar os dados de uma cidade
router.put('/Cidade', async (req: Request, res: Response) => {
    try {
        const id = req.query.id as string;
        const cidadeDTO = req.body;
        const atualizaCidade = await updateCidade(req.prisma,cidadeDTO, parseInt(id));
        return res.status(atualizaCidade.status).json({msg: atualizaCidade.msg});
    } catch (error) {
        if (error instanceof Error) {
            const tratamento = await tratamentoError(error);
            return res.status(tratamento.status).json(tratamento.msg);
        }
        return res.status(500).json({msg: 'Houve uma falha crítica no servidor.'});
    };
});

//rota para deletar uma cidade
router.delete('/Cidade', async (req: Request, res: Response) => {
    try {
        const id = req.query.id as string;
        const deletarCidade = await deleteCidade(req.prisma,parseInt(id));
        return res.status(deletarCidade.status).json({msg: deletarCidade.msg});
    } catch (error) {
        if (error instanceof Error) {
            const tratamento = await tratamentoError(error);
            return res.status(tratamento.status).json(tratamento.msg);
        }
        return res.status(500).json({msg: 'Houve uma falha crítica no servidor.'});
    };
});

//rota para selecionar todas as cidades ou a especificada no filtro
router.get('/Cidade', async (req: Request, res: Response) => {
    try {
        const id = req.query.id as string;
        const page = req.query.page as string;
        const pageSize = req.query.pageSize as string;
        let cidades;
        if(parseInt(id) > 0){
            cidades = await selectCidadeId(req.prisma, parseInt(id));
        } else {
            cidades = await selectCidade(req.prisma,parseInt(page), parseInt(pageSize));
        }
        if(cidades) {
            return res.status(200).json(cidades);
        }
        return res.status(200).json({msg: 'Não foi possivel localizar a(s) cidade(s).'});
    } catch (error) {
        if (error instanceof Error) {
            const tratamento = await tratamentoError(error);
            return res.status(tratamento.status).json(tratamento.msg);
        }
        return res.status(500).json({msg: 'Houve uma falha crítica no servidor.'});
    };
});

/************************ROTAS DO OBJETO CLIENTE**************************/

//rota para cadastrar um cliente
router.post('/Cliente', async (req: Request, res: Response) => {
    try {
        const cliente = req.body;
        const novoCliente = await createCliente(req.prisma, cliente);
        return res.status(novoCliente.status).json({msg: novoCliente.msg});
    } catch (error) {
        if (error instanceof Error) {
            const tratamento = await tratamentoError(error);
            return res.status(tratamento.status).json(tratamento.msg);
        }
        return res.status(500).json({msg: 'Houve uma falha crítica no servidor.'});
    };
});

//rota para atualizar os dados de um cliente
router.put('/Cliente', async (req: Request, res: Response) => {
    try {
        const id = req.query.id as string;
        const cliente = req.body;
        const atualizaCliente = await updateCliente(req.prisma, cliente, parseInt(id));
        return res.status(atualizaCliente.status).json({msg: atualizaCliente.msg});
    } catch (error) {
        if (error instanceof Error) {
            const tratamento = await tratamentoError(error);
            return res.status(tratamento.status).json(tratamento.msg);
        }
        return res.status(500).json({msg: 'Houve uma falha crítica no servidor.'});
    };
});

//rota para deletar o cliente selecionado
router.delete('/Cliente', async (req: Request, res: Response) => {
    try {
        const id = req.query.id as string;
        const cliente = await deleteCliente(req.prisma, parseInt(id));
        return res.status(cliente.status).json({msg: cliente.msg});
    } catch (error) {
        if (error instanceof Error) {
            const tratamento = await tratamentoError(error);
            return res.status(tratamento.status).json(tratamento.msg);
        }
        return res.status(500).json({msg: 'Houve uma falha crítica no servidor.'});
    };
});

//rota para buscar todos os clientes ou com o filtro do id do cliente
router.get('/Cliente', async (req: Request, res: Response) => {
    try {
        const id = req.query.id as string;
        const page = req.query.page as string;
        const pageSize = req.query.pageSize as string;
        if(parseInt(id) > 0){
            const cliente = await selectClienteId(req.prisma,parseInt(id));
            if(cliente){
                return res.status(200).json(cliente);
            }
            return res.status(200).json({msg: 'Nenhuma informação para exibir.'});
        }
        const clientes = await selectCliente(req.prisma, parseInt(page), parseInt(pageSize));
        if(clientes.data.length > 0){
            return res.status(200).json(clientes);
        }
        return res.status(200).json({msg: 'Nenhuma informação para exibir.'});
    } catch (error) {
        if (error instanceof Error) {
            const tratamento = await tratamentoError(error);
            return res.status(tratamento.status).json(tratamento.msg);
        }
        return res.status(500).json({msg: 'Houve uma falha crítica no servidor.'});
    };
});

<<<<<<< HEAD
/************************ROTAS DO OBJETO CONTRATO**************************/

//rota para cadastrar um novo contrato
router.post('/Contrato', async (req: Request, res: Response) => {
    try {
        const response = await createContrato(req.prisma, req.body);
        return res.status(response.status).json(response.msg);
    } catch (error) {
        if(error instanceof Error){
            const tratamento = await tratamentoError(error);
            return res.status(tratamento.status).json(tratamento.msg);
        };
        return res.status(500).json({msg: 'Houve uma falha crítica no sistema. Por favor, contate um especialista.'});
    };
});

module.exports = router;
=======
module.exports = router;
>>>>>>> e67f20ea4b3cd4623e2d94252f390ea0f13fccf1
