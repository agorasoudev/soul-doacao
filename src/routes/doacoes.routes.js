import { Router } from 'express';
import DoacaoController from '../app/controllers/DoacaoController';

const doacaoRoutes = new Router()

doacaoRoutes.post('/createdoacao/:id', DoacaoController.createDoacao);

export default doacaoRoutes;