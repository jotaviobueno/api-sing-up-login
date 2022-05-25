import ArticleRepository from '../repository/ArticleRepository.js';

class ArticleController {
    async article (req, res) {
        const token = req.headers.token;
        const {title, description, body} = req.body;
        
        if (! await ArticleRepository.findSession(token)) {
            return res.status(404).json({message: 'Session invalid!'});
        }

        if (! await ArticleRepository.checkoutSlug(title)) {
            return res.status(422).json({message: 'existing article title'});
        }

        if (! await ArticleRepository.newArticle(token, title, description, body)) {
            return res.status(201).json({message: 'Article created'});
        }
        return res.status(401).json({message: 'token not found'});
    }

    async findAllArticle (req, res) {
        return res.status(200).json({Articles: await ArticleRepository.findAllArticles()});
    }

    async findOne (req, res) {
        const findSlug = await ArticleRepository.findOneArticle(req.params.slug_ArticleTitle);

        if (findSlug) {
            return res.status(200).json({Article: findSlug});
        }
        return res.status(401).json({message: 'slug is not found'});
    }

    async upDate (req, res) {
        const token = req.headers.token;
        const slug = req.params.slug_ArticleTitle;
        const {title, description, body} = req.body;

        if (! await ArticleRepository.findSession(token)) {
            return res.status(404).json({message: 'Session invalid!'});
        }
        
        if (! await ArticleRepository.findArticle(slug)) {
            return res.status(404).json({message: 'Slug invalid!'});
        }

        if (! await ArticleRepository.ownerTheArticle(slug, token)) {
            return res.status(404).json({message: 'Session invalid!'});
        }

        if (! await ArticleRepository.existTitle(title)) {
            return res.status(404).json({message: 'title exist!'});
        }

        if (! await ArticleRepository.UpDate(slug, title, description, body)) {
            return res.status(404).json({message: 'article already exists!'});
        }
        return res.status(200).json({message: 'Updated!'});
    }

    async Delete (req, res) {
        const token = req.headers.token;
        const slug = req.params.slug_ArticleTitle;
        
        if (! await ArticleRepository.findSession(token)) {
            return res.status(404).json({message: 'Session invalid!'});
        }

        if (! await ArticleRepository.findAndUpDate(slug)) {
            return res.status(404).json({message: 'Slug invalid!'});
        }
        return res.status(200).json({message: 'Deleted!'});

    }
}

export default new ArticleController();