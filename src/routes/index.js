import { Router } from 'express';
import OngController from '../app/controllers/OngController'

const routes = new Router()

routes.post('/create', OngController.create)

export default routes