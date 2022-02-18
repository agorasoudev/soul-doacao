import { Router } from 'express';
import OngController from '../app/controllers/OngController'
import DoadorController from '../app/controllers/DoadorController';


import VoluntarioController from '../app/controllers/VoluntarioController';

const routes = new Router()

routes.post('/create', OngController.create)
routes.post('/createdoador', DoadorController.create)


routes.post('/create/voluntario', VoluntarioController.create)

export default routes