import { model, Schema } from "mongoose";

const Voluntario = model(
    "Voluntario",
    new Schema({
        name: {type: String, required: true},
        contato: {
            telefone: {type: String, required: true},
            email: {type: String, required: true},
        },
        funcao: {type: String, required: false}
    })
);

export default Voluntario;
