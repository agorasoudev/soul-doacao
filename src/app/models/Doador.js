import { model, Schema } from 'mongoose';

const Doador = model(
    "Doador",
    new Schema({
        name: { type: String, required: true },
        contato: {
            telefone: { type: String, required: false },
            email: { type: String, required: true },
        },
        estado: { type: String, required: false },
        anonimo: { type: Boolean, required: false },
        doacao: [],
    })
);

export default Doador;