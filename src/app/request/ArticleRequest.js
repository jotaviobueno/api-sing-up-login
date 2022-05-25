import yup from 'yup';

class ArticleRequest {
    async validateArticle (req, res, next) {
        req.headers;

        const schema = await yup.object().shape({

            title: yup.string ("title is not defined")
            .required ("the title is required for registration the article")
            .min (3,"the title cannot be less than 3")
            .max (50,"the title cannot be greater than 50"),

            description: yup.string ("description is not defined")
            .required ("the description is required for registration the article")
            .min (3,"the description cannot be less than 3")
            .max (150,"the description  cannot be greater than 150"),

            body: yup.string ('body is not defined')
            .required ("the body is required for registration")
            .min (3,"the body cannot be less than 3")
            .max (150,"the body cannot be greater than 150"),

        });

        const token = await yup.object().shape({

            token: yup.string ("token is not defined")
            .required ("the token is required for registration the article")
        });
    
        try {
            await schema.validate(req.body);
            await token.validate(req.headers);

        } catch(err) {
            return res.status(400).json({
                message:err.errors
            });
        }
       await next();
    }

    async validateSlug (req, res, next) {
        req.headers;

        const schema = await yup.object().shape({

            slug_ArticleTitle: yup.string ("slug is not defined")
            .required ("the slug is required for find the article")

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
        req.headers;

        const token = await yup.object().shape({

            token: yup.string("token is not defined")
            .required ("the token is required for find the article")
            .nullable()

        });
        
        const slug = await yup.object().shape({

            slug_ArticleTitle: yup.string ("slug is not defined")
            .required ("the slug is required for find the article")

        });
        
        const body = await yup.object().shape({

            title: yup.string ("title is not defined")
            .required ("the title is required for registration the article")
            .min (3,"the title cannot be less than 3")
            .max (50,"the title cannot be greater than 50"),

            description: yup.string ("description is not defined")
            .required ("the description is required for registration the article")
            .min (3,"the description cannot be less than 3")
            .max (150,"the description  cannot be greater than 150"),

            body: yup.string ('body is not defined')
            .required ("the body is required for registration")
            .min (3,"the body cannot be less than 3")
            .max (150,"the body cannot be greater than 150"),

        });

        try {
            await token.validate(req.headers);
            await slug.validate(req.params);
            await body.validate(req.body);

        } catch(err) {
            return res.status(400).json({
                message:err.errors
            });
        }
       await next();
    }

    async validateDelete (req, res, next) {
        req.headers;

        const token = await yup.object().shape({

            token: yup.string("token is not defined")
            .required ("the token is required for find the article")
            .nullable()

        });
        
        const slug = await yup.object().shape({

            slug_ArticleTitle: yup.string ("slug is not defined")
            .required ("the slug is required for find the article")

        });
        
        try {
            await token.validate(req.headers);
            await slug.validate(req.params);

        } catch(err) {
            return res.status(400).json({
                message:err.errors
            });
        }
       await next();
    }
}

export default new ArticleRequest();