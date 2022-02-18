import { Router } from 'express';
import OngController from '../app/controllers/OngController'
import DoacaoController from '../app/controllers/DoacaoController'

const routes = new Router()

routes.post('/create', OngController.create)
routes.post('/create/doacao', DoacaoController.createDoacao)


export default routes