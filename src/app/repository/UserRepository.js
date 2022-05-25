import user from '../model/User.js';
import bcrypt from 'bcrypt';

class UserRepository {
    async existEmail (email) {
        const existEmail = await user.find({email: email, deleted_at: null});
        
        if (existEmail.length === 1) {
            return true;
        }
        return false;
    }

    async existCpf (cpf) {
        const existCpf = await user.find({cpf: cpf, deleted_at: null});
        
        if (existCpf.length === 1) {
            return true;
        }
        return false;
    }

    async store (full_name, email, cpf, password, birth_date) {
        await user.create({
            full_name: full_name,
            email: email,
            password: await bcrypt.hash(password, 10),
            cpf: cpf,
            birth_date: birth_date,
            account_created: new Date(),
            deleted_at: null,
            last_update:null,
            admin: false,
        });
    }

    async showUser (_id) {
        const find = await user.findOne({_id: _id, deleted_at: null}).select({password: 0, cpf: 0, __v: 0});
        const findAllUsers = await user.find({_id: _id, deleted_at: null}).select({password: 0, cpf: 0, __v: 0});

        if(findAllUsers.length === 0) {
            return false;
        }

        return find;
    }

    async updateUser (full_name, _id) {
        const findAllUsers = await user.find({_id: _id, deleted_at: null});

        if (findAllUsers.length === 0) {
            return false;
        }

        await user.findOneAndUpdate({_id: _id}, {full_name: full_name, last_update: new Date()});
        return true;
    }

    async delete (_id) {
        const findUser = await user.find({_id: _id, deleted_at: null});

        if (findUser.length === 0) {
            return false;
        }

        await user.findOneAndUpdate({_id: _id}, {deleted_at: new Date()});
        return true;
    }
}

export default new UserRepository();
