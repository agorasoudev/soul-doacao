import Ong from "../models/Ong";

class OngController {
    static async store(req, res) {
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
            const {
                name,
                endereco,
                segmento,
                cnpj,
                n_funcionarios,
                voluntarios,
                contato,
                caixa,
            } = req.body;

            const ong = Ong({
                name,
                endereco,
                segmento,
                cnpj,
                n_funcionarios,
                voluntarios,
                contato,
                caixa,
            });
            await ong.save();
            return res.status(201).json(ong);
        }
    }

    static async index(req, res) {
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
        try {
            const ong = await Ong.findById(req.params.id);
            if (!ong) {
                return res.status(404).json({ message: "ONG não encontrada" });
            } else {
                return res.status(200).json(ong);
            }
        } catch (err) {
            return res.status(400).json({ message: "ID informado não é uma string de 12 bytes ou uma string de 24 caracteres hex" });
        }
    }

    static async update(req, res) {
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
        const { id, email } = req.body;
        if(!id || !email) {
            return res.status(400).json({ message: "É necessário informar o ID ou o E-mail da ONG" });
        }
        if(id){
            try {
                const ong = await Ong.findByIdAndDelete(id);
                if (ong) {
                    return res.status(200).json({ message: "ONG deletada com sucesso" });
                } else {
                    return res.status(404).json({ message: "ONG não encontrada" });
                }
            } catch (err) {
                return res.status(500).json({ message: "Erro ao deletar ONG" });
            }
        } else {
            try {
                const ong = await Ong.findOneAndDelete({ email });
                if (ong) {
                    return res.status(200).json({ message: "ONG deletada com sucesso" });
                } else {
                    return res.status(404).json({ message: "ONG não encontrada" });
                }
            } catch (err) {
                return res.status(500).json({ message: "Erro ao deletar ONG" });
            }
        }


        
    }
}

export default OngController;
