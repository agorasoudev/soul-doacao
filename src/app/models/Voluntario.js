import { model, Schema } from "mongoose";

const Voluntario = model(
    "Voluntario",
    new Schema({
        name: String,
        contato: {
            telefone: String,
            email: String,
        },
        funcao: String,
        ong: [],
    })
);

export default Voluntario;
