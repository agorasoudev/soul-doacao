import Doacao from "../models/Doacao";
import Doador from "../models/Doador";
import Donation from "../models/SeqDoacao";
import Ong from "../models/Ong";
import Donator from "../models/SeqDoador";

class DoacaoController {
    static async store(req, res) {
        /* #swagger.tags=["Doação"]
        #swagger.description="Cadastra uma Doação"
        #swagger.parameters['obj'] = [
            {
                "in": "body",
                "description": "Dados da Doação",
                "required": true,
                "type":"string",
                "schema": {
                    "$metodo": "pix",
                    "$email": "sabrino@gmail.com",
                    "$ong": "CasaCasa",
                    "$valor": 100  
                }
            }
        ]
        */

        const { id } = req.params;
        const { metodo, email, ong, valor, item } = req.body;
        const instituto = await Ong.findById(id);

        const doador = await Doador.findOne({ email });

        const hash = email.split("@")[0] + new Date().getTime();

        if (metodo && email && ong) {
            if ((!valor && item) || (!item && valor)) {
                let doacao;

                const data = new Date();
                const dataFormatada =
                    data.getDate() +
                    "/" +
                    (data.getMonth() + 1) +
                    "/" +
                    data.getFullYear();

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

                await doacao.save();

                const doacao_doc = await Doacao.findOne({ hash });

                doador.doacao.push(doacao_doc._id);

                const donatorId = await Donator.findAll({
                    where: { id_doc_donator: doador._id.toString() },
                });
                console.log("to na globo");
                console.log(donatorId);

                const doar = {
                    valor,
                    id_doc_doador: doador._id.toString(),
                    id_doc_ong: id,
                    id_doc_donation: doacao_doc._id.toString(),
                    DonatorId: 1,
                    OrganizationId: 1
                };

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
            });
        } else {
            return res
                .status(400)
                .json({ error: "Os campos não podem estar vazios" });
        }
    }

    static async index(req, res) {
        // #swagger.tags=["Doação"]
        // #swagger.description= "End Point exibe todas as Doações cadastradas"
        const doacoes = await Doacao.find();

        if (doacoes.length == 0) {
            res.status(402).json({ error: "Nenhuma doação encontrada" });
            return;
        }
        res.status(200).json({ doacoes });
    }

    static async show(req, res) {
        // #swagger.tags=["Doação"]
        // #swagger.description= End Point exibe apenas uma doação cadastrada passando o ID
        // #swagger.parameters['id'] = { description: 'ID da doação', type: 'string', required: true }
        try {
            const doacao = await Doacao.findById(req.params.id);
            if (!doacao) {
                return res.status(404).json({ error: "Doação não encontrada" });
            } else {
                return res.status(200).json(doacao);
            }
        } catch (err) {
            return res.status(400).json({ message: "Requisição inválida" });
        }
    }

    static async update(req, res) {
        /* #swagger.tags=["Doação"]
        #swagger.description="Atualização de Doação"
        #swagger.parameters['obj'] = [
            {
                "in": "body",
                "description": "Dados da doação que deseja alterar.",
                "required": true,
                "type":"string",
                "schema": {
                    "$metodo": "pix",
                    "$email": "sabrino@gmail.com",
                    "$ong": "CasaCasa",
                    "$valor": 100  
                }
            }
        ]
        */
        try {
            const doacao = await Doacao.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!doacao) {
                return res.status(404).json({ error: "Doação não encontrada" });
            } else {
                return res
                    .status(200)
                    .json({ message: "Doação atualizada com sucesso" });
            }
        } catch (err) {
            return res
                .status(400)
                .json({ message: "Erro na atualização da doação" });
        }
    }

    static async destroy(req, res) {
        // #swagger.tags=["Doação"]
        // #swagger.description= "Informe o ID da Doação que deseja deletar"
        try {
            const { id } = req.params;
            const doacao = await Doacao.findByIdAndDelete(req.params.id);
            console.log(doacao);
            if (!id) {
                return res.status(404).json({ error: "Doação não encontrada" });
            } else {
                return res
                    .status(200)
                    .json({ message: "Doação excluída com sucesso" });
            }
        } catch (err) {
            return res
                .status(400)
                .json({ message: "Erro na exclusão da Doação" });
        }
    }
}

export default DoacaoController;
