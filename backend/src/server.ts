import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
const route = require('./router/Route');

dotenv.config();

const app = express();
app.use(cors({origin:"*"}));
app.use(express.json());
const port = process.env.SERVICE_PORT;

app.use(route);

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});