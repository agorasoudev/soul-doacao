import Voluntario from "../models/Voluntario";
import Voluntary from "../models/SeqVoluntario";

class VoluntarioController {
    static async store(req, res) {
        /* #swagger.tags=["Voluntário"]
        #swagger.description="Cadastra um voluntário"
        #swagger.parameters['obj'] = [
            {
                "in": "body",
                "description": "Dados do Voluntário",
                "required": false,
                "type":"string",
                "schema": {
                    $name : "Alexandre",
                    $contato:{
                        $email :"ale@gmail.com",
                        $telefone : "11999999999"
                    },
                    $função : "Diretor"
                }
            }
        ]
        */
        const { name, contato, funcao } = req.body;
        const voluntario = Voluntario({
            name,
            contato,
            funcao,
        });

        if (
            !name ||
            !voluntario.contato.telefone ||
            !voluntario.contato.email
        ) {
            return res.status(402).json({ message: "Parametros vazios" });
        }

        await voluntario.save();

        const voluntary = {
            name,
            email: contato.email,
            telefone: contato.telefone,
            id_documento: voluntario._id.toString()
        }

        await Voluntary.create(voluntary);

        return res
            .status(201)
            .json({ message: `Voluntário ${voluntario.name} cadastrado` });
    }

    static async index(req, res) {
        // #swagger.tags=["Voluntário"]
        // #swagger.description= "End Point exibe todos os Voluntários cadastradas"
        const voluntarios = await Voluntario.find();

        if (voluntarios.length === 0) {
            res.status(402).json({ message: "Lista de Voluntarios Vazia" });
            return;
        }

        res.status(200).json(voluntarios);
    }

    static async show(req, res) {
        // #swagger.tags=["Voluntário"]
        // #swagger.description= End Point exibe apenas um voluntário cadastrada passando o ID
        // #swagger.parameters['id'] = { description: 'ID do voluntário', type: 'string', required: true }
        try {
            const voluntario = await Voluntario.findById(req.params.id);
            if (!voluntario) {
                return res
                    .status(404)
                    .json({ message: "Voluntario não encontrado" });
            } else {
                return res.status(200).json(voluntario);
            }
        } catch (err) {
            return res.status(400).json({
                message:
                    "ID informado não é uma string de 12 bytes ou uma string de 24 caracteres hex",
            });
        }
    }

    static async update(req, res) {
        /* #swagger.tags=["Voluntário"]
        #swagger.description="Atualização do voluntário"
        #swagger.parameters['obj'] = [
            {
                "in": "body",
                "description": "Dados do voluntário",
                "required": false,
                "type":"string",
                "schema": {
                    $name : "Alexandre",
                        $email :"ale@gmail.com",
                        $telefone : "11999999999"
                    },
                    $função : "Diretor"
                }
            }
        ]
        */
        try {
            const voluntario = await Voluntario.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!voluntario) {
                return res
                    .status(404)
                    .json({ message: "Voluntario não encontrado" });
            } else {
                return res.status(200).json({
                    message: `Voluntario ${voluntario.name} atualizado`,
                });
            }
        } catch (err) {
            return res
                .status(400)
                .json({ message: "Erro ao atualizar voluntário" });
        }
    }

  static async destroy(req, res){
      // #swagger.tags=["Voluntário"]
      // #swagger.description= "Informe o ID ou o E-mail do voluntário que deseja deletar. OBS: Caso informe os 2, o ID será priorizado"
      
      const { id, email } = req.body;

      if (!id && !email) {
          return res
              .status(400)
              .json({ message: "É necessário informar o ID do voluntário" });
      }
      if (id) {
          const voluntario = await Voluntario.findByIdAndDelete(id);
          if (voluntario) {
              return res
                  .status(200)
                  .json({ message: "Voluntario deletado com sucesso" });
          } else {
              return res
                  .status(404)
                  .json({ message: "Voluntario não encontrado" });
          }
      } else {
          const voluntario = await Voluntario.findOneAndDelete({"contato.email": {$in: email}});
          if (voluntario) {
            return res
                .status(200)
                .json({ message: "Voluntario deletado com sucesso" });
        } else {
            return res
                .status(404)
                .json({ message: "Voluntario não encontrado" });
        }
      }
  }
}

export default VoluntarioController;
