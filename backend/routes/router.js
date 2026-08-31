/**
 * Arquivo principal de rotas da aplicação.
 * Define todas as rotas da API REST e servindo de arquivos estáticos.
 */

import { Router } from 'express';
import express from 'express';
import path from 'path';
import CONSTANTS from '../bootstrap/config.js';
import ListFilesController from '../app/Http/Controllers/ListFilesController.js';
import GetFileController from '../app/Http/Controllers/GetFileController.js';
import Return404Controller from '../app/Http/Controllers/Return404Controller.js';
import userRouter from './apis/userRouter.js';
import fileUpload from 'express-fileupload';
import swaggerUi from 'swagger-ui-express';
import LoginController from '../app/Http/Controllers/LoginController.js';
import AuthMiddleware from '../app/Http/Middlewares/AuthMiddleware.js';
import CorsMiddleware from '../app/Http/Middlewares/CorsMiddleware.js';
import SwaggerDoc from '../app/Http/SwaggerDoc.js';

const router = Router();

/**
 * Middleware de CORS
 * Libera o acesso à API para o front-end de desenvolvimento (Vite)
 */
router.use(CorsMiddleware);

/**
 * Middleware para parsear requisições com Content-Type: application/json
 * Permite receber e processar dados JSON no body das requisições
 */
router.use(express.json());

/**
 * Middleware para parsear requisições com Content-Type: application/x-www-form-urlencoded
 * Permite receber dados enviados por formulários HTML tradicionais
 */
router.use(express.urlencoded({ extended: true }));

/**
 * Middleware para upload de arquivos
 * Adiciona suporte a multipart/form-data para envio de arquivos
 */
router.use(fileUpload());

/**
 * Rota para obter um arquivo específico
 * GET /arquivo?file=nome_do_arquivo
 */
router.get("/arquivo", GetFileController);

/**
 * Rota raiz que lista todos os arquivos disponíveis na pasta 'public'
 * GET /
 */
router.get('/', ListFilesController);

/**
 * Middleware para servir arquivos estáticos da pasta 'public'
 * Qualquer arquivo em public/ será acessível diretamente
 * Ex: public/teste.css será acessível em /teste.css
 */
router.use(express.static(path.join(CONSTANTS.DIR, 'public')));

/**
 * Rota de documentação Swagger
 * Usa swagger-ui-express com o spec gerado pelo DocSwaggerController.
 */
router.use('/docs', swaggerUi.serve, swaggerUi.setup(SwaggerDoc()));

/**
 * ========================================
 * ROTAS DE API REST
 * ========================================
 */

/** Login */
router.post('/login', LoginController);

/** Router para usuários */
router.use("/users", userRouter);

/**
 * Fallback 404 para requisições não encontradas
 * Captura qualquer rota que não foi definida acima
 * e retorna um erro 404 apropriado
 */
router.use(Return404Controller);

export default router;

