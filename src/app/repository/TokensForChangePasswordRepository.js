import user from '../model/User.js';
import TokensForChangePassword from '../model/TokensForChangePassword.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

class TokenForChangePasswordRepository {
    async existEmail (email) {
        const existEmail = await user.find({email: email, deleted_at: null});
        
        if (existEmail.length === 1) {
            return true;
        }
        return false;
    }

    async findEmailAndUpDateToken (email) {
        const existToken = await user.find({email: email});

        if (existToken.length === 1) {
            await TokensForChangePassword.updateMany({email: email}, {token_expired: new Date().setHours(new Date().getHours())});
            return true;
        }
        return false;
    }

    async CreateToken (email) {
        const token = uuidv4();

        await TokensForChangePassword.create({
            email: email,
            token_for_change_password: token,
            token_created_in: new Date(),
            token_expires_in: new Date().setHours(new Date().getHours() + 1),
            token_expired: null
        })
        return token;
    }

    async findToken (token) {
        const findResult = await TokensForChangePassword.find({token_for_change_password: token});

        if (findResult.length === 0) {
            return false;
        }
        return true;
    }


    async checkToken (token) {
        const findResult = await TokensForChangePassword.findOne({token_for_change_password: token});

        if (findResult.token_expired != null) {
            return false;
        }
        return true;
    }

    async VerifyEmail (token, email) {
        const findResult = await TokensForChangePassword.findOne({token_for_change_password: token, token_expired: null});

        if (email != findResult.email) {
            return false;
        }
        return true;
    }

    async VerifyPassword (email, password) {
        const GetHash = await user.findOne({email: email, deleted_at: null});

        if  (GetHash === null) {
            return true;
        }

        if (await bcrypt.compare(password, GetHash.password)) {
            return false;
        }
        return true;
    }
    
    async upDatePassword (email, password, token) {
        await user.findOneAndUpdate({email: email}, {password: await bcrypt.hash(password, 10), last_update: new Date()});
        await TokensForChangePassword.findOneAndUpdate({token_for_change_password: token}, {token_expired: new Date()});
        
    }
}

export default new TokenForChangePasswordRepository();