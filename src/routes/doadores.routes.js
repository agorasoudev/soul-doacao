import { Router } from 'express';
import DoadorController from '../app/controllers/DoadorController';

const doadoresRoutes = new Router()

doadoresRoutes.post('/createdoador', DoadorController.create);

export default doadoresRoutes;