import TokensForChangePasswordRepository from '../repository/TokensForChangePasswordRepository.js';

class TokensForChangePasswordController {
    async getToken (req, res) {
        const email = req.body.email;
        
        if (!await TokensForChangePasswordRepository.existEmail(email)) {
            return res.status(422).json({message: 'email not found!'});    
        };
        
        if (!await TokensForChangePasswordRepository.findEmailAndUpDateToken(email)) {
            return res.status(422).json({message: 'token not found!'});    
        };

        //send token to email
        return res.status(201).json({
            message: 'token create',
            token: await TokensForChangePasswordRepository.CreateToken(email)
        });
    }

    async ChangePassword (req, res) {
        const {token, email, password} = req.body;

        if (! await TokensForChangePasswordRepository.existEmail(email)) {
            return res.status(422).json({message: 'email not found!'});    
        }

        if (! await TokensForChangePasswordRepository.findToken(token)) {
            return res.status(401).json({message: 'token not found'});
        }

        if (! await TokensForChangePasswordRepository.checkToken(token)) {
            return res.status(401).json({message: 'token invalid!'});
        }

        if (! await TokensForChangePasswordRepository.VerifyEmail(token, email)) {
            return res.status(422).json({message: 'email and different'});
        }

        if (! await TokensForChangePasswordRepository.VerifyPassword(password, email)) {
            return res.status(401).json({message: 'password and equal to the one already registered in the account'});
        }

        await TokensForChangePasswordRepository.upDatePassword(email, password, token);
        return res.status(200).json({message: 'Password Updated successfully'});
    }
}

export default new TokensForChangePasswordController();