import express from 'express';
import chalk from 'chalk';

import router from './routes/router.js';
import app from "./bootstrap/app.js";

/** Inicializador */
app();

/** */
/** Iniciar roteador */
const web = express();

/** Registrar as Rotas */
web.use('/', router);

const port = process.env.NODE_WEB_PORT;

web.listen(port, () => {
    console.log(chalk.green(`Servidor node web rodando na porta ${port}`));
});

