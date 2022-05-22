import UserSession from '../model/UserSession.js';
import user from '../model/User.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

class UserSessionRepository {
    async comparePasswordAndVerifyExistUser (email, password) {
        const GetHash = await user.findOne({email: email});
        const existEmail = await user.find({email: email, deleted_at: null});
        
        if (existEmail.length === 0) {
            return false;
        }

        if (await bcrypt.compare(password, GetHash.password)) {
            return true;
        }
    }

    async existSession (email) {
        const existSession = await UserSession.find({email: email});
        
        if (existSession.length >= 1) {
            await UserSession.updateMany({email: email},{disconnected_in: new Date().setHours(new Date().getHours())});
        }
        return false;
    }

    async newSession (email) {
        const token = uuidv4()
        await UserSession.create({
            email: email,
            token_for_session: token,
            token_created_in: new Date(),
            token_expires_in: new Date().setHours(new Date().getHours() + 6),
            disconnected_in: null
        });
        return token;
    }

    async logout (session_id) {
        //create a new validate//
        await UserSession.findOneAndUpdate({token_for_session: session_id, disconnected_in:null}, {disconnected_in:new Date()});
    }
}   
export default new UserSessionRepository();