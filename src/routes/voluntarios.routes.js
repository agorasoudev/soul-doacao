import { Router } from "express";
import VoluntarioController from "../app/controllers/VoluntarioController";

const voluntariosRoutes = new Router();

voluntariosRoutes.post("/voluntario/create", VoluntarioController.store),
voluntariosRoutes.get("/voluntarios", VoluntarioController.index),
voluntariosRoutes.get("/voluntario/:id", VoluntarioController.show),
voluntariosRoutes.patch("/voluntario/:id", VoluntarioController.update);
voluntariosRoutes.delete("/voluntario/:id", VoluntarioController.destroy);

export default voluntariosRoutes;
