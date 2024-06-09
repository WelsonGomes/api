import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
const router = express.Router();
import { createEstado } from '../controller/Cliente';

dotenv.config();

const port = process.env.SERVICE_PORT;

router.post('/Estado', async (req: Request, res: Response) => {
    const estadoDTO = req.body;
    const novoEstado = await createEstado(estadoDTO);
    return res.status(novoEstado.status).json(novoEstado.msg);
});

router.get('/', (req, res) => {
    return res.json({'msg': `Server online on port ${port} para teste de rotas`});
});

module.exports = router;