import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
const router = express.Router();
import { createEstado, deleteEstado, selectEstado, selectEstadoId, updateEstado } from '../controller/EstadoController';
import { createCidade, deleteCidade, selectCidade, selectCidadeId, updateCidade } from '../controller/CidadeController';

dotenv.config();

//rotas do objeto de estado
router.post('/Estado', async (req: Request, res: Response) => {
    const estadoDTO = req.body;
    const novoEstado = await createEstado(req.prisma, estadoDTO);
    return res.status(novoEstado.status).json({msg: novoEstado.msg});
});

router.put('/Estado/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const estadoDTO = req.body;
    const atualizaEstado = await updateEstado(req.prisma,estadoDTO, parseInt(id));
    return res.status(atualizaEstado.status).json({msg: atualizaEstado.msg});
});

router.delete('/Estado/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletarEstado = await deleteEstado(req.prisma,parseInt(id));
    return res.status(deletarEstado.status).json({msg: deletarEstado.msg});
});

router.get('/Estado', async (req: Request, res: Response) => {
    const estados = await selectEstado(req.prisma);
    if(estados.length > 0){
        return res.status(200).json(estados);
    }
    return res.status(200).json({msg: 'Nenhum registro para mostrar.'});
});

router.get('/Estado/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const estado = await selectEstadoId(req.prisma,parseInt(id));
    if(estado){
        return res.status(200).json(estado);
    }
    return res.status(200).json({msg: 'Não foi encontrado este estado.'});
});

//rotas do objeto de cidade
router.post('/Cidade', async (req: Request, res: Response) => {
    const cidadeDTO = req.body;
    const novaCidade = await createCidade(req.prisma,cidadeDTO);
    return res.status(novaCidade.status).json({msg: novaCidade.msg});
});

router.put('/Cidade/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const cidadeDTO = req.body;
    const atualizaCidade = await updateCidade(req.prisma,cidadeDTO, parseInt(id));
    return res.status(atualizaCidade.status).json({msg: atualizaCidade.msg});
});

router.delete('/Cidade/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletarCidade = await deleteCidade(req.prisma,parseInt(id));
    return res.status(deletarCidade.status).json({msg: deletarCidade.msg});
});

router.get('/Cidade/:page/:pageSize', async (req: Request, res: Response) => {
    const page = req.params.page;
    const pageSize = req.params.pageSize;
    const cidades = await selectCidade(req.prisma,parseInt(page),parseInt(pageSize));
    if(cidades.data.length > 0){
        return res.status(200).json(cidades);
    }
    return res.status(200).json({msg: 'Nenhum registro para mostrar.'});
});

router.get('/Cidade/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const cidade = await selectCidadeId(req.prisma,parseInt(id));
    if(cidade){
        return res.status(200).json(cidade);
    }
    return res.status(200).json({msg: 'Não foi encontrado esta cidade.'});
});

module.exports = router;