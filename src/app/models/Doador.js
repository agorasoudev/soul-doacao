import { model, Schema } from 'mongoose';

const Doador = model(
    "Doador",
    new Schema({
        name: String,
        contato: {
            telefone: {type: String, required: true},
            email: {type: String, required: true},
        },
        estado: String,
        anonimo: String,
        doacao: []
    })
);

export default Doador;