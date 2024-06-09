import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
const router = express.Router();
import { createEstado } from '../controller/Cliente';

dotenv.config();

const port = process.env.SERVICE_PORT;

router.post('/Estado', async (req: Request, res: Response) => {
    const estadoDTO = req.body;
    return res.json(await createEstado(estadoDTO));
    // try {
    //     const estadoDTO = req.body;
    //     const novoEstado = await createEstado(estadoDTO);
    //     return res.status(200).json({'msg': 'Cadastrado um novo estado.'});
    // } catch (error) {
    //     console.log(error);
    //     return res.status(500).json({'msg': 'Houve uma falha ao tentar cadastrar um novo estado.'});
    // }
});

router.get('/', (req, res) => {
    return res.json({'msg': `Server online on port ${port} para teste de rotas`});
});

module.exports = router;