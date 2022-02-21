import { Router } from 'express';
import DoadorController from '../app/controllers/DoadorController';

const doadoresRoutes = new Router()

doadoresRoutes.post('/create/doador', DoadorController.store);
doadoresRoutes.post('/doadores', DoadorController.index);
doadoresRoutes.get('/doador/:id',DoadorController.show);
doadoresRoutes.patch('/doador/:id', DoadorController.update);
doadoresRoutes.delete('/doador/:id', DoadorController.destroy);

export default doadoresRoutes;