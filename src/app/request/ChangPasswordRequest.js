import yup from 'yup';

class ChangePasswordRequest {
    async validateGetToken (req, res, next) {
        req.headers;

        const schema = await yup.object().shape({

            email: yup.string ('email is not defined')
            .required ("the email is required for registration")
            .email ('send in email format'),

        });
    
        try {
            await schema.validate(req.body);

        } catch(err) {
            return res.status(400).json({
                message:err.errors
            });
        }
       await next();
    }

    async validateChangePassword (req, res, next) {
        req.headers;

        const schema = await yup.object().shape({

            email: yup.string ('email is not defined')
            .required ("the email is required for registration")
            .email ('send in email format'),

            password: yup.string ('password is not defined')
            .required ('the password is required for registration')
            .min (6,'the password cannot be less than 3')
            .max (35,'the password cannot be greater than 35'),
            
            token: yup.string ('token is not defined')
            .required ('the token is not defined'),
        });
    
        try {
            await schema.validate(req.body);

        } catch(err) {
            return res.status(400).json({
                message:err.errors
            });
        }
       await next();
    }
}

export default new ChangePasswordRequest();