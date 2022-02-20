import Voluntario from '../models/Voluntario';

class VoluntarioController {
  static async store(req,res){
    const { name, contato, funcao} = req.body;
    const voluntario = Voluntario({
      name,
      contato,
      funcao
    });

    if(!name || !voluntario.contato.telefone || !voluntario.contato.email) {
      return res.status(402).json({message: 'Parametros vazios'})
    }

    await voluntario.save();
    return res.status(201).json({message: `Voluntário ${voluntario.name} cadastrado`});
  }
  
  static async index(req, res){
    const voluntarios = await Voluntario.find()

    if(voluntarios.length === 0 ){
      res.status(402).json({message: 'Lista de Voluntarios Vazia'})
      return
    }

    res.status(200).json(voluntarios)
  }

  static async show(req, res){
    try {
      const voluntario = await Voluntario.findById(req.params.id);
      if(!voluntario) {
        return res.status(404).json({message: "Voluntario não encontrado"})
      } else {
        return res.status(200).json(voluntario);
      }
    } catch (err) {
      return res.status(400).json({ message: "ID informado não é uma string de 12 bytes ou uma string de 24 caracteres hex" });
    }
  }
}

export default VoluntarioController;