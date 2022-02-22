import { Router } from 'express';
import DoacaoController from '../app/controllers/DoacaoController';

const doacaoRoutes = new Router()

doacaoRoutes.post('/createdoacao/:id', DoacaoController.store);
doacaoRoutes.get('/doacoes', DoacaoController.index);
doacaoRoutes.get('/doacao/:id', DoacaoController.show);
doacaoRoutes.patch('/doacao/:id', DoacaoController.update);
doacaoRoutes.delete('/doacao/:id', DoacaoController.destroy);


export default doacaoRoutes;