import { model, Schema } from "mongoose";

const Ong = model(
    "Ong",
    new Schema({
        name: { type: String, required: true },
        endereco: { type: String, required: true },
        segmento: { type: String, required: true },
        cnpj: { type: String, required: true },
        n_funcionarios: { type: Number, required: true },
        contato: {
            email: { type: String, required: true },
            telefone: { type: String, required: false },
            site: { type: String, required: false },
        },
        caixa: { type: Number, required: true },
        doacoes: [],
    })
);

export default Ong;
