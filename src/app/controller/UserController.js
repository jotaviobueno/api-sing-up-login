import UserRepository from "../repository/UserRepository.js";

class UserController {
    async store (req, res) {
        const {full_name, email, password, cpf, birth_date} = req.body;

        if (await UserRepository.existEmail(email)) {
            return res.status(422).json({message: "Email not found"});
        }   

        if (await UserRepository.existCpf(cpf)) {
            return res.status(422).json({message:'Cpf Exist'});
        }

        await UserRepository.store(full_name, email, cpf, password, birth_date);
        return res.status(201).json({message:'Created'});
    }
    
    async show (req, res) {
        const findResult = await UserRepository.showUser(req.params._id);
        
        if (! findResult) {
            return res.status(404).json({message: 'User not found'});
        }

        return res.status(200).json({user: findResult});
    }

    async update (req, res) {
        const findAndUpdate = await UserRepository.updateUser(req.body.full_name, req.params._id);

        if (! findAndUpdate) {
            return res.status(422).json({message: 'id not found'});
        }
        return res.status(200).json({user: 'updated!'});
    }

    async delete (req, res) {
        const findAndUpdate = await UserRepository.delete(req.params._id);

        if (! findAndUpdate) {
            return res.status(422).json({message: 'id not found'});
        }
        return res.status(200).json({user: 'deleted!'});
    }
}

export default new UserController();