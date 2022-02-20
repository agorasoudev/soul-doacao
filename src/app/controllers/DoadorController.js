import Doador from '../models/Doador';

class DoadorController {
        static async store(req, res){
        const { name, contato, estado, anonimo, doacao } = req.body;
        const doador = Doador ({
            name,
            contato,
            estado,
            anonimo,
            doacao,
        });

        if(!name || !doador.contato.telefone || !doador.contato.email || !doador.estado) {
            return res.status(402).json({message: 'doador-parametros-vazios'})
        }

        await doador.save();
        return res.status(201).json({message: `doador-${doador.name}-cadastrado`});
    }    
}

export default DoadorController;