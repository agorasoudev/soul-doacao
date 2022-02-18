import Ong from '../models/Ong';

class OngController {
  static async create(req,res){
    const { name, endereco, segmento, cnpj, n_funcionarios, contato } = req.body;
    const ong = Ong({
      name,
      endereco,
      segmento,
      cnpj,
      n_funcionarios,
      contato,
    });
    await ong.save();
    return res.json(ong);
  }
}

export default OngController;