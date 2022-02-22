import { model, Schema } from "mongoose";

const Voluntario = model(
    "Voluntario",
    new Schema({
        name: {type: String, required: true},
        contato: {
            telefone: {type: String, required: false},
            email: {type: String, required: true},
        },
        funcao: {type: String, required: false}
    })
);

export default Voluntario;
