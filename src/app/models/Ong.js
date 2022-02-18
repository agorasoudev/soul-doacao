import { model, Schema } from "mongoose";

const Ong = model(
    "Ong",
    new Schema({
        name: String,
        endereco: String,
        segmento: String,
        cnpj: String,
        n_funcionarios: Number,
        voluntarios: [],
        contato: {
            email: String,
            telefone: String,
            site: String,
        },
        caixa:Number,
        doacoes: [],
    })
);

export default Ong;
