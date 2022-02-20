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
      return res.status(402).json({message: 'voluntario-parametros-vazios'})
    }

    await voluntario.save();
    return res.status(201).json({message: `voluntario-${voluntario.name}-cadastrado}`});
  }
}

export default VoluntarioController;