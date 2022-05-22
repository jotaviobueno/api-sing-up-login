import UserSessionRepository from '../repository/UserSessionRepository.js';

class UserSessionController {
    async login (req, res) {
        const {email, password} = req.body;

        if (! await UserSessionRepository.comparePasswordAndVerifyExistUser(email, password)) {

            return res.status(401).json({message: 'not authorized'});
        }
        
        if (! await UserSessionRepository.existSession(email)) {
            const token = await UserSessionRepository.newSession(email);

            return res.status(200).json({
                message: 'login made',
                TokenSession: token
            });
        }
    }

    async logout (req, res) {
        await UserSessionRepository.logout(req.params.session_id);
        return res.status(200).json({message: 'disconnected'});
    }
} 

export default new UserSessionController();
