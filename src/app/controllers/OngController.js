import Ong from "../models/Ong";
import Organization from "../models/SeqOng";

class OngController {
    static async store(req, res) {
        /* #swagger.tags=["ONGs"]
        #swagger.description="Cadastra uma ONG"
        #swagger.parameters['obj'] = [
            {
                "in": "body",
                "description": "Dados da ONG - os únicos dados não obrigatórios são o telefone e o site presentes no contato",
                "required": true,
                "type":"string",
                "schema": {
                    $name : "Soul Doação",
                    $endereco : "Rua Angra dos Reis",
                    $segmento : "Conectividade",
                    $cnpj : "80.580.861/0001-25",
                    $n_funcionarios : 4,
                    $contato : {
                        $email :"soudoacao@gmail.com",
                        $site : "https://soudoacao.com.br",
                        $telefone : "11999999999"
                    },
                    $caixa : 100
                }
            }
        ]
        */

        const empty = [];
        Object.keys(req.body).forEach((key) => {
            if (req.body[key] == "") {
                empty.push(key);
            }
        });
        if (empty.length > 0) {
            return res.status(400).json({
                message: `Os campos ${empty.join(", ")} não podem ser vazios`,
            });
        } else {
            const { name, endereco, segmento, cnpj,
                n_funcionarios, voluntarios, contato,
                caixa, } = req.body;

            const ong = Ong({ name, endereco, segmento,
                cnpj, n_funcionarios, voluntarios,
                contato, caixa, });
            
                await ong.save();

            const osc = { name, cnpj,
                email: contato.email,
                telefone: contato.telefone,
                caixa,
                id_doc_ong: ong._id.toString(),
            }
            
            await Organization.create(osc);

            return res.status(201).json(ong);
        }
    }

    static async index(req, res) {
        // #swagger.tags=["ONGs"]
        // #swagger.description= "End Point exibe todas as ONGs cadastradas"
        try {
            const ongs = await Ong.find();
            if (ongs.length > 0) {
                return res.status(200).json(ongs);
            } else {
                return res
                    .status(200)
                    .json({ message: "Nenhuma ONG cadastrada" });
            }
        } catch (err) {
            return res.status(500).json({ message: "Erro ao listar ONGs" });
        }
    }

    static async show(req, res) {
        // #swagger.tags=["ONGs"]
        // #swagger.description= End Point exibe apenas uma ONG cadastrada passando o ID
        // #swagger.parameters['id'] = { description: 'ID da ONG', type: 'string', required: true }
        try {
            const ong = await Ong.findById(req.params.id);
            if (!ong) {
                return res.status(404).json({ message: "ONG não encontrada" });
            } else {
                return res.status(200).json(ong);
            }
        } catch (err) {
            return res.status(400).json({
                message:
                    "ID informado não é uma string de 12 bytes ou uma string de 24 caracteres hex",
            });
        }
    }

    static async update(req, res) {
        /* #swagger.tags=["ONGs"]
        #swagger.description="Atualização de uma ONG"
        #swagger.parameters['obj'] = [
            {
                "in": "body",
                "description": "Dados da ONG",
                "required": false,
                "type":"string",
                "schema": {
                    $name : "Soul Doação",
                    $endereco : "Rua Angra dos Reis",
                    $segmento : "Conectividade",
                    $cnpj : "80.580.861/0001-25",
                    $n_funcionarios : 4,
                    $contato : {
                        $email :"soudoacao@gmail.com",
                        $site : "https://soudoacao.com.br",
                        $telefone : "11999999999"
                    },
                    $caixa : 100
                }
            }
        ]
        */
        try {
            const ong = await Ong.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
            });
            if (ong) {
                return res.status(200).json(ong);
            } else {
                return res.status(404).json({ message: "ONG não encontrada" });
            }
        } catch (err) {
            return res.status(400).json({ message: "Erro ao atualizar ONG" });
        }
    }

    static async destroy(req, res) {
        // #swagger.tags=["ONGs"]
        // #swagger.description= "Informe o ID ou o E-mail da ONG que deseja deletar. OBS: Caso informe os 2, o ID será priorizado"
        const { id,email } = req.body;
        
        if (!id && !email) {
            return res.status(400).json({
                message: "É necessário informar o ID ou o E-mail da ONG",
            });
        }
        if (id) {
            try {
                const ong = await Ong.findByIdAndDelete(id);
                if (ong) {
                    return res
                        .status(200)
                        .json({ message: "ONG deletada com sucesso" });
                } else {
                    return res
                        .status(404)
                        .json({ message: "ONG não encontrada" });
                }
            } catch (err) {
                return res.status(500).json({ message: "Erro ao deletar ONG" });
            }
        } else {
            try {
                console.log(email);
                const ong = await Ong.findOneAndDelete({"contato.email": {$in: email}});
                console.log('ONG=> ',ong);
                if (ong) {
                    return res
                        .status(200)                                    
                        .json({ message: "ONG deletada com sucesso" });
                } else {
                    return res
                        .status(404)
                        .json({ message: "ONG não encontrada" });
                }
            } catch (err) {
                return res.status(500).json({ message: "Erro ao deletar ONG" });
            }
        }
    }
}

export default OngController;
