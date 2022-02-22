import Doacao from "../models/Doacao"; // Importa o modelo do MongoDB
import Doador from "../models/Doador"; // Importa o modelo do MongoDB
import Donation from "../models/SeqDoacao";
import Ong from "../models/Ong";
import Donator from "../models/SeqDoador";

class DoacaoController {
    // Cria a classe DoacaoController
    static async store(req, res) {
        // Cria o método createDoacao}
        const { id } = req.params; //!-> ONG
        const { metodo, email, ong, valor, item } = req.body; // Cria as variáveis com os dados do corpo da requisição
        const instituto = await Ong.findById(id);

        const doador = await Doador.findOne({ email }); //!-> Doador

        const hash = email.split("@")[0] + new Date().getTime();

        //! VERIFICA SE O DADO ESTÁ VÁLIDO
        if (metodo && email && ong) {
            // Verifica se os dados estão vazios

            if ((!valor && item) || (!item && valor)) {
                //! CRIANDO DOCUMENTO DE DOAÇÃO
                // valor ? Doacao({metodo, ong, valor, hash:hash}) : Doacao({metodo, ong, item, hash})
                let doacao;

                //! ADICIONAR A DATA QUE A DOÇÃO FOI CRIADA
                const data = new Date(); // Cria uma constante data que recebe um construtor de data
                const dataFormatada =
                    data.getDate() +
                    "/" +
                    (data.getMonth() + 1) +
                    "/" +
                    data.getFullYear(); // Formata a data para o padrão dd/mm/aaaa.

                if (item && item.objeto !== "" && item.quantidade > 0) {
                    doacao = await Doacao({
                        metodo,
                        ong,
                        item,
                        hash,
                        data: dataFormatada,
                    });
                } else {
                    doacao = await Doacao({
                        metodo,
                        ong,
                        valor,
                        hash,
                        data: dataFormatada,
                    });
                }

                await doacao.save(); // Salva a doação no banco de dados

                const doacao_doc = await Doacao.findOne({ hash }); // Busca a doação no banco de dados

                //! RELAÇÃO DOAÇÃO - DOADOR
                doador.doacao.push(doacao_doc._id); // Adiciona a doação no array do doador

                const donatorId = await Donator.findAll({
                    where: { id_doc_donator: doador._id.toString() },
                });
                console.log('to na globo')
                console.log(donatorId);

                const doar = {
                    valor,
                    id_doc_doador: doador._id.toString(),
                    id_doc_ong: id,
                    id_doc_donation: doacao_doc._id.toString(),
                    DonatorId: 1,
                    OrganizationId: 1,
                };

                //! RELAÇÃO DOAÇÃO - ONG
                if (
                    metodo === "pix" ||
                    metodo === "transferencia" ||
                    metodo === "deposito"
                ) {
                    instituto.caixa += valor;
                    instituto.save();
                    await Donation.create(doar);
                    return res.status(201).json(doacao_doc);
                }

                if (metodo === "doacao") {
                    if (instituto.doacoes.length == 0) {
                        instituto.doacoes.push(item);
                    } else {
                        let doacaoBusca = instituto.doacoes.find(
                            (i) => i.objeto === item.objeto
                        );
                        if (!doacaoBusca) {
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
            return res.status(402).json({
                error: "Dados inválidos: Necessário Inserir um Valor ou Item",
            }); // Se não houver valor ou item retorna um erro.
        } else {
            return res
                .status(400)
                .json({ error: "Os campos não podem estar vazios" }); // Se não houver metodo, email e id retorna um erro
        }
    }

    //Método Read
    static async index(req, res) {
        const doacoes = await Doacao.find(); // Busca todas as doações da ONG

        if (doacoes.length == 0) {
            res.status(402).json({ error: "Nenhuma doação encontrada" });
            return;
        }
        res.status(200).json({ doacoes }); // Retorna todas as doações da ONG
    }

    //Método Show

    static async show(req, res) {
        try {
            const doacao = await Doacao.findById(req.params.id); // Busca a doação no banco de dados
            if (!doacao) {
                return res.status(404).json({ error: "Doação não encontrada" }); // Retorna uma mensagem de erro
            } else {
                return res.status(200).json(doacao); // Retorna a doação
            }
        } catch (err) {
            return res.status(400).json({ message: "Requisição inválida" }); // Retorna uma mensagem de erro
        }
    }

    //Método Update
    static async update(req, res) {
        try {
            const doacao = await Doacao.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!doacao) {
                return res.status(404).json({ error: "Doação não encontrada" }); // Retorna uma mensagem de erro
            } else {
                return res
                    .status(200)
                    .json({ message: "Doação atualizada com sucesso" }); // Retorna a doação
            }
        } catch (err) {
            return res
                .status(400)
                .json({ message: "Erro na atualização da doação" }); // Retorna uma mensagem de erro
        }
    }

    //Método Delete
    static async destroy(req, res) {
        try {
            const { id } = req.params; //!-> ONG
            const doacao = await Doacao.findByIdAndDelete(req.params.id); // Busca a doação no banco de dados
            console.log(doacao);
            if (!id) {
                return res.status(404).json({ error: "Doação não encontrada" }); // Retorna uma mensagem de erro
            } else {
                return res
                    .status(200)
                    .json({ message: "Doação excluída com sucesso" }); // Retorna a doação
            }
        } catch (err) {
            return res
                .status(400)
                .json({ message: "Erro na exclusão da Doação" }); // Retorna uma mensagem de erro
        }
    }
}

export default DoacaoController; // Exporta a classe DoacaoController
