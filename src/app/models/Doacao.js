import { model, Schema } from "mongoose"; // Importa o mongoose

const Doacao = model( // Cria o modelo do MongoDB
    "Doacao", 
    new Schema({
        metodo: String,
        email: String,
        ong: String,
        valor: Number,
        item: {
            objeto: String,
            quantidade: Number,
        },
        hash: String,
    })
);

export default Doacao;

