import { Router } from 'express';
import OngController from '../app/controllers/OngController'
import DoacaoController from '../app/controllers/DoacaoController'
import DoadorController from '../app/controllers/DoadorController';


import VoluntarioController from '../app/controllers/VoluntarioController';

const routes = new Router()

routes.post('/create', OngController.store)
routes.get('/ongs', OngController.index)
routes.get('/ong/:id', OngController.show)
routes.patch('/ong/:id', OngController.update)
routes.delete('/ong', OngController.destroy)
routes.post('/createdoacao/:id', DoacaoController.createDoacao)
routes.post('/createdoador', DoadorController.create)


routes.post('/create/voluntario', VoluntarioController.store)

export default routes