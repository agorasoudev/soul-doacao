import Ong from '../models/Ong';

class OngController {
  static async create(req,res){
    const { name, endereco, segmento, cnpj, n_funcionarios,voluntarios, contato,caixa } = req.body;
    const ong = Ong({
      name,
      endereco,
      segmento,
      cnpj,
      n_funcionarios,
      voluntarios,
      contato,
      caixa
    });
    await ong.save();
    return res.json(ong);
  }
}

export default OngController;