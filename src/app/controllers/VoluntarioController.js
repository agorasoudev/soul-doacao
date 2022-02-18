import Voluntario from '../models/Voluntario';

class VoluntarioController {
  static async create(req,res){
    const { name, contato, funcao, ong} = req.body;
    const voluntario = Voluntario({
      name,
      contato,
      funcao,
      ong
    });
    await voluntario.save();
    return res.json(voluntario);
  }
}

export default VoluntarioController;