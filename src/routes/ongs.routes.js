import { Router } from 'express';
import OngController from '../app/controllers/OngController'

const ongRoutes = new Router()

ongRoutes.post('/create', OngController.store),
ongRoutes.get('/ongs', OngController.index),
ongRoutes.get('/ong/:id', OngController.show),
ongRoutes.patch('/ong/:id', OngController.update),
ongRoutes.delete('/ong', OngController.destroy);

export default ongRoutes;