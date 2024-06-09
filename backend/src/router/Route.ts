import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
const router = express.Router();
import { createEstado, updateEstado } from '../controller/Cliente';

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



module.exports = router;