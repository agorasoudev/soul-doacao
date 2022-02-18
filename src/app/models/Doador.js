import { model, Schema } from 'mongoose';

const Doador = model(
    "Doador",
    new Schema({
        name: String,
        contato: {
            telefone: String,
            email: String,
        },
        estado: String,
        anonimo: String,
        doacao: Array
    })
);

export default Doador;