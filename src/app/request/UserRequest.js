import yup from 'yup';

class UserRequest {
    async validateStore (req, res, next) {
        req.headers;

        const schema = await yup.object().shape({

            full_name: yup.string ("name is not defined")
            .required ("the name is required for registration")
            .min (3,"the name cannot be less than 3")
            .max (30,"the name cannot be greater than 30"),

            email: yup.string ('email is not defined')
            .required ("the email is required for registration")
            .email ('send in email format'),

            cpf: yup.string ('cpf is not defined')
            .required ("the cpf is required for registration")
            .min (10,"the cpf cannot be less than 11")
            .max (12,"the cpf cannot be greater than 11"),

            birth_date: yup.string ('birth date is not defined')
            .required ("the birth date is required for registration")
            .min (9,"the cpf cannot be less than 11")
            .max (11,"the cpf cannot be greater than 11"),

            password: yup.string ('password is not defined')
            .required ('the password is required for registration')
            .min (6,'the password cannot be less than 3')
            .max (35,'the password cannot be greater than 35')
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

    async validateShow (req, res, next) {

        const schema = await yup.object().shape({

            _id: yup.string ('id has not been defined')
            .required ('the _id is required for show')
            .min (23,"the _id cannot be less than 23")
            .max (25,"the _id cannot be greater than 25")
        });
    
        try {
            await schema.validate(req.params);

        } catch(err) {
            return res.status(400).json({
                message:err.errors
            });
        }
       await next();
    }

    async validateUpDate (req, res, next) {
        req.headers

        const schema = await yup.object().shape({

            full_name: yup.string ("name is not defined")
            .required ("the name is required for registration")
            .min (3,"the name cannot be less than 3")
            .max (30,"the name cannot be greater than 30")
        });

        const schema_id = await yup.object().shape({
            _id: yup.string ('id has not been defined')
                .required ('the _id is required for show')
                .min (23,"the _id cannot be less than 23")
                .max (25,"the _id cannot be greater than 25")
        
        });

        try {
            await schema.validate(req.body);
            await schema_id.validate(req.params);

        } catch(err) {
            return res.status(400).json({
                message:err.errors
            });
        }
       await next();
    }

    async validateDelete (req, res, next) {

        const schema = await yup.object().shape({

            _id: yup.string ('id has not been defined')
            .required ('the _id is required for show')
            .min (23,"the _id cannot be less than 23")
            .max (25,"the _id cannot be greater than 25")
        });
    
        try {
            await schema.validate(req.params);

        } catch(err) {
            return res.status(400).json({
                message:err.errors
            });
        }
       await next();
    }

}

export default new UserRequest();