import { Router } from 'express';
import OngController from '../app/controllers/OngController'
import DoacaoController from '../app/controllers/DoacaoController'
import DoadorController from '../app/controllers/DoadorController';


import VoluntarioController from '../app/controllers/VoluntarioController';
import DoadorController from '../app/controllers/DoadorController';

const routes = new Router()

routes.post('/create', OngController.store)
routes.get('/ongs', OngController.index)
routes.get('/ong/:id', OngController.show)
routes.patch('/ong/:id', OngController.update)
routes.delete('/ong', OngController.destroy)
routes.post('/createdoacao/:id', DoacaoController.createDoacao)


routes.post('/create/voluntario', VoluntarioController.store)
routes.post('/create/doador', DoadorController.store)
routes.get('/voluntarios', VoluntarioController.index)
routes.get('/voluntario/:id', VoluntarioController.show)
routes.get('/doadores', DoadorController.index)
routes.get('/doador/:id', DoadorController.show)
routes.patch('/voluntario/:id', VoluntarioController.update)

export default routes