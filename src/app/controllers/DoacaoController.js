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
        // console.log('instituto => ',instituto);
        const doador = await Doador.findOne({ email }); //!-> Doador
        // console.log('doador=> ',doador);
        const hash = email.split("@")[0] + new Date().getTime();

        //! VERIFICA SE O DADO ESTÁ VÁLIDO
        if (metodo && email && ong ) { // Verifica se os dados estão vazios

            if (!valor && item || !item && valor) {

                //! CRIANDO DOCUMENTO DE DOAÇÃO
                // valor ? Doacao({metodo, ong, valor, hash:hash}) : Doacao({metodo, ong, item, hash})
                let doacao;

                //! ADICIONAR A DATA QUE A DOÇÃO FOI CRIADA
                const data = new Date(); // Cria uma constante data que recebe um construtor de data
                const dataFormatada= data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear(); // Formata a data para o padrão dd/mm/aaaa.

                if (item && item.objeto !== "" && item.quantidade > 0) {
                    doacao = await Doacao({ metodo, ong, item, hash, data: dataFormatada }); 
                } else {
                    doacao = await Doacao({ metodo, ong, valor, hash, data: dataFormatada }); 
                }

                await doacao.save(); // Salva a doação no banco de dados

                const doacao_doc = await Doacao.findOne({ hash }); // Busca a doação no banco de dados
               
                //! RELAÇÃO DOAÇÃO - DOADOR
                doador.doacao.push(doacao_doc._id); // Adiciona a doação no array do doador
               
                //! RELAÇÃO DOAÇÃO - ONG

                if (metodo === "pix" || metodo === "transferencia" || metodo === "deposito") {
                    instituto.caixa += valor;
                    instituto.save();
                    return res.status(201).json(doacao_doc);
                }

                if (metodo === "doacao") {
                    if(instituto.doacoes.length == 0) {
                        instituto.doacoes.push(item);
                    } else {
                        let doacaoBusca = instituto.doacoes.find((i => i.objeto === item.objeto));
                        if(!doacaoBusca){
                            instituto.doacoes.push(item);
                        } else {
                            doacaoBusca.quantidade += item.quantidade;
                        }
                        console.log(instituto);
                    }
                    await Ong.findByIdAndUpdate(id, instituto);

                    return res.status(201).json(doacao_doc); 
                }
        
            }
            return res.status(402).json({ error: "Dados inválidos: Necessário Inserir um Valor ou Item" }); // Se não houver valor ou item retorna um erro.

        } else { 
            return res.status(400).json({ error: "Os campos não podem estar vazios" }); // Se não houver metodo, email e id retorna um erro
        }
    }

    //Método Read

    static async index(req, res) {
        const { id } = req.params; //!-> ONG
        const doacoes = await Doacao.find({ ong: id }); // Busca todas as doações da ONG
        return res.status(200).json(doacoes); // Retorna as doações
    }

    //Método Update

    static async update(req, res) {
          
    }
    
    //Método Delete

    static async delete(req, res) {
        const { id } = req.params; //!-> ONG
        const doacao = await Doacao.findById(id); // Busca a doação no banco de dados
        await doacao.remove(); // Remove a doação do banco de dados
        return res.status(200).json({ message: "Doação removida com sucesso!" }); // Retorna uma mensagem de sucesso
    }

}

export default DoacaoController; // Exporta a classe DoacaoController
