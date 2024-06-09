import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
const router = express.Router();
import { createEstado, deleteEstado, selectEstado, selectEstadoId, updateEstado } from '../controller/ClienteController';

dotenv.config();

const port = process.env.SERVICE_PORT;

//rotas do objeto de estado
router.post('/Estado', async (req: Request, res: Response) => {
    const estadoDTO = req.body;
    const novoEstado = await createEstado(estadoDTO);
    return res.status(novoEstado.status).json({msg: novoEstado.msg});
});

router.put('/Estado/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const estadoDTO = req.body;
    const atualizaEstado = await updateEstado(estadoDTO, parseInt(id));
    return res.status(atualizaEstado.status).json({msg: atualizaEstado.msg});
});

router.delete('/Estado/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletarEstado = await deleteEstado(parseInt(id));
    return res.status(deletarEstado.status).json({msg: deletarEstado.msg});
});

router.get('/Estado', async (req: Request, res: Response) => {
    const estados = await selectEstado();
    if(estados.length > 0){
        return res.status(200).json(estados);
    }
    return res.status(200).json({msg: 'Nenhum registro para mostrar.'});
});

router.get('/Estado/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const estado = await selectEstadoId(parseInt(id));
    if(estado){
        return res.status(200).json(estado);
    }
    return res.status(200).json({msg: 'Não foi encontrado este estado.'});
});

module.exports = router;