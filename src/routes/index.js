import { Router } from 'express';
import ongRoutes from './ongs.routes';
import doacaoRoutes from './doacoes.routes';
import doadoresRoutes from './doadores.routes';
import voluntariosRoutes from './voluntarios.routes'

const routes = new Router()
routes.use([
    doacaoRoutes,
    doadoresRoutes,
    ongRoutes,
    voluntariosRoutes,
]);

export default routes;
