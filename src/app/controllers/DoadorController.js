import Doador from '../models/Doador';

class DoadorController {
        static async create(req, res){
        const {name, contato, estado, anonimo, doacao} = req.body;
        const doador = Doador ({
            name,
            contato,
            estado,
            anonimo,
            doacao,
        });
        await doador.save();
        return res.json(doador);
    }    
}

export default DoadorController;