import ArticleRepository from '../repository/ArticleRepository.js';

class ArticleController {
    async article (req, res) {
        const token = req.headers.token;
        const {title, description, body} = req.body;
        
        if (! await ArticleRepository.findSession(token)) {
            return res.status(404).json({message: 'Session invalid!'});
        }

        await ArticleRepository.newArticle(token, title, description, body);
        return res.status(201).json({message: 'Article created'});
    }

    
}

export default new ArticleController();