import { Router } from 'express';
import OngController from '../app/controllers/OngController'
import DoadorController from '../app/controllers/DoadorController';

const routes = new Router()

routes.post('/create', OngController.create)
routes.post('/createdoador', DoadorController.create)

export default routes