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
    
    static async index(req, res) {
        const doadores = await Doador.find()

        if(doadores.length === 0){
            res.status(402).json({message: 'Lista de Doadores Vazia'})
            return
        }

        res.status(200).json(doadores)
    }

    static async show(req, res){
        try {
            const doador = await Doador.findById(req.params.id);
            if(!doador) {
                return res.status(404).json({message: "Doador não encontrado"})
            } else {
                return res.status(200).json(doador);
            }

        } catch (err) {
            return res.status(400).json({message: "Enquadramento de mensagem de requisição inválida"});
        }
    }

    static async update(req, res){
        try {
            const doador = await Doador.findByIdAndUpdate(req.params.id, req.body, {new: true})
            if(!doador){
                return res.status(404).json({message: 'Doador não encontrado'})
            } else {
                return res.status(200).json({message: `Doador ${doador.name} atualizado com sucesso`})
            }
        } catch (err) {
            return res.status(400).json({message: 'Erro na atualização de Doador'})
        }
    }
}

export default DoadorController;