import Doacao from "../models/Doacao"; // Importa o modelo do MongoDB
import Doador from "../models/Doador"; // Importa o modelo do MongoDB
import Ong from "../models/Ong";

class DoacaoController {
    // Cria a classe DoacaoController
    static async store(req, res) {
        // Cria o método createDoacao}
        const { id } = req.params; //!-> ONG
        const { metodo, email, ong, valor, item } = req.body; // Cria as variáveis com os dados do corpo da requisição
        const instituto = await Ong.findById(id); 
        console.log('instituto => ',instituto);
        const doador = await Doador.findOne({ email }); //!-> Doador
        console.log('doador=> ',doador);
        const hash = email.split("@")[0] + new Date().getTime();

        //! VERIFICA SE O DADO ESTÁ VÁLIDO
        if (!metodo || !email || !id || !valor || !item) {
            return res.status(402).json({ message: "É necessário informar todos os dados" }); 
            } if (!instituto) {
                return res.status(404).json({ message: "Instituto não encontrado" }); 
                } if (!doador) {
                    return res.status(404).json({ message: "Doador não encontrado" }); 
                }

        //! CRIANDO DOCUMENTO DE DOAÇÃO
        // valor ? Doacao({metodo, ong, valor, hash:hash}) : Doacao({metodo, ong, item, hash})
        let doacao;

        //! ADICIONAR A DATA QUE A DOÇÃO FOI CRIADA
        const data = new Date(); // Cria uma constante data que recebe um construtor de data
        const dataFormatada= data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear(); // Formata a data

        if (!valor) {
            doacao = await Doacao({ metodo, ong, item, hash, data: dataFormatada });
        } else {
            doacao = await Doacao({ metodo, ong, valor, hash, data:dataFormatada });
        }

        await doacao.save(); // Salva a doação no banco de dados

        const doacao_doc = await Doacao.findOne({ hash }); // busca
        console.log('documento=>',doacao_doc);
        
        //! RELAÇÃO DOAÇÃO - DOADOR
        doador.doacao.push(doacao_doc._id);
        console.log(doacao_doc._id)

        //! RELAÇÃO DOAÇÃO - ONG
        if (
            metodo === "pix" ||
            metodo === "transferencia" ||
            metodo === "deposito"
        ) {
            instituto.caixa += valor;
        } else {
            instituto.doacoes.forEach((i) => {
                console.log('i => ',i.objeto)
                console.log('item => ',item.objeto)
                if (i.objeto === item.objeto) {
                    console.log('true')
                    i.quantidade += item.quantidade;
                } else {
                    console.log('false')
                    instituto.doacoes.push(item);
                }
            });
        }
        instituto.save()
        
        return res.status(201).json(doacao_doc); // Retorna a doação
    }
}

export default DoacaoController; // Exporta a classe DoacaoController
