import Doacao from '../models/Doacao'; // Importa o modelo do MongoDB

class DoacaoController { // Cria a classe DoacaoController
    static async createDoacao(req, res) { // Cria o método createDoacao}
        const { metodo, doador, ong, valor, item } = req.body; // Cria as variáveis com os dados do corpo da requisição
        const doacao = Doacao({
            metodo,
            doador,
            ong,
            valor,
            item,
        }); // Cria a doação

        await doacao.save(); // Salva a doação no banco de dados
        return res.json(doacao); // Retorna a doação
    } 
}

export default DoacaoController; // Exporta a classe DoacaoController