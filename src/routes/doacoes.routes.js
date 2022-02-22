import { Router } from 'express';
import DoacaoController from '../app/controllers/DoacaoController';

const doacaoRoutes = new Router()

doacaoRoutes.post('/createdoacao', DoacaoController.createDoacao);

export default doacaoRoutes;