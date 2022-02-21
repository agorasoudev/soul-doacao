import { Router } from 'express';
import VoluntarioController from '../app/controllers/VoluntarioController';

const voluntariosRoutes = new Router()

voluntariosRoutes.post('/create/voluntario', VoluntarioController.store),
voluntariosRoutes.get('/voluntarios', VoluntarioController.index),
voluntariosRoutes.get('/voluntario/:id', VoluntarioController.show),
voluntariosRoutes.patch('/voluntario/:id', VoluntarioController.update);

export default voluntariosRoutes;
