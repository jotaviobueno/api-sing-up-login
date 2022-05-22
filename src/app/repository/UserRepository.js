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

    async showUserAndFind (_id) {
        const find = await user.findOne({_id: _id, deleted_at: null});
        const findAllUsers = await user.find({_id: _id, deleted_at: null});

        if(findAllUsers.length === 0) {
            return false;
        }

        return ({
            full_name: find.full_name,
            email: find.email,
            cpf: find.cpf,
            birth_date: find.birth_date,
            account_created: find.account_created,
            deleted_at: find.deleted_at,
            last_update: find.last_update,
            admin: find.admin

        });
    }

    async updateUser (full_name, _id) {
        const findAllUsers = await user.find({_id: _id, deleted_at: null});

        if (findAllUsers.length === 0) {
            //id not found
            return false;
        }

        await user.findOneAndUpdate({_id: _id}, {full_name: full_name, last_update: new Date()});
        return true;
    }

    async delete (_id) {
        const findUser = await user.find({_id: _id, deleted_at: null});

        if (findUser.length === 0) {
            //id not found
            return false;
        }

        await user.findOneAndUpdate({_id: _id}, {deleted_at: new Date()});
        return true;
    }
}

export default new UserRepository();
