import Doador from "../models/Doador";
import Donator from '../models/SeqDoador'

class DoadorController {
    static async store(req, res) {
        /* #swagger.tags=["Doador"]
        #swagger.description="Cadastra um Doador"
        #swagger.parameters['obj'] = [
            {
                "in": "body",
                "description": "Dados do Doador - os únicos dados obrigatórios são o nome e o email.",
                "required": true,
                "type":"string",
                "schema": {
                    $name : "José Vinicius",
                    $estado : "PE",
                    $contato : {
                        $email :"vini_dev@gmail.com",
                        $telefone : "81999999999"
                    }
                }
            }
        ]
        */
        const { name, contato, estado, anonimo, doacao } = req.body;
        const doador = Doador({
            name,
            contato,
            estado,
            anonimo,
            doacao,
        });

        if (
            !name ||
            !doador.contato.telefone ||
            !doador.contato.email ||
            !doador.estado
        ) {
            return res
                .status(402)
                .json({ message: "doador-parametros-vazios" });
        }

        await doador.save();
  
        const donator = {
            name,
            email: contato.email,
            telefone: contato.telefone,
            id_documento: doador._id.toString(),
        }

        await Donator.create(donator);

        return res
            .status(201)
            .json({ message: `doador-${doador.name}-cadastrado` });
    }

    static async index(req, res) {
        // #swagger.tags=["Doador"]
        // #swagger.description= "End Point exibe todas os Doadores cadastrados"
        const doadores = await Doador.find();

        if (doadores.length === 0) {
            res.status(402).json({ message: "Lista de Doadores Vazia" });
            return;
        }

        res.status(200).json(doadores);
    }

    static async show(req, res) {
        // #swagger.tags=["Doador"]
        // #swagger.description= End Point exibe apenas um Doador cadastrado passando o ID
        // #swagger.parameters['id'] = { description: 'ID do Doador', type: 'string', required: true }
        try {
            const doador = await Doador.findById(req.params.id);
            if (!doador) {
                return res
                    .status(404)
                    .json({ message: "Doador não encontrado" });
            } else {
                return res.status(200).json(doador);
            }
        } catch (err) {
            return res.status(400).json({
                message: "Enquadramento de mensagem de requisição inválida",
            });
        }
    }

    static async update(req, res) {
        /* #swagger.tags=["Doador"]
        #swagger.description="Atualização do Doador"
        #swagger.parameters['obj'] = [
            {
                "in": "body",
                "description": "Dados do Doador - os únicos dados obrigatórios são o nome e o email.",
                "required": true,
                "type":"string",
                "schema": {
                    $name : "José Vinicius",
                    $estado : "PE",
                    $contato : {
                        $email :"vini_dev@gmail.com",
                        $telefone : "81999999999"
                    }
                }
            }
        ]
        */
        try {
            const doador = await Doador.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!doador) {
                return res
                    .status(404)
                    .json({ message: "Doador não encontrado" });
            } else {
                return res.status(200).json({
                    message: `Doador ${doador.name} atualizado com sucesso`,
                });
            }
        } catch (err) {
            return res
                .status(400)
                .json({ message: "Erro na atualização de Doador" });
        }
    }

    static async destroy(req, res) {
        // #swagger.tags=["Doador"]
        // #swagger.description= "Informe o ID do Doador para deletar"
        try {
            const { id } = req.params;
            const doador = await Doador.findByIdAndDelete(id);
            console.log(id, doador);
            if (!id) {
                return res
                    .status(404)
                    .json({ message: "Doador não encontrado" });
            } else {
                res.status(200).json({
                    message: `Doador ${doador.id} excluído com sucesso`,
                });
            }
        } catch (err) {
            return res
                .status(400)
                .json({ message: "Erro na exclusão de Doador" });
        }
    }
}

export default DoadorController;
