import UserSession from '../model/UserSession.js';
import Article from '../model/Article.js';

class ArticleRepository {
    async findSession (token) {
        const findSession = await UserSession.find({token_for_session: token})   

        if (findSession.length === 0) {
            return false;
        }
        return true;
    }

    async newArticle (token, title, description, body) {
        const findSession = await UserSession.findOne({token_for_session: token, disconnected_in: null})

        await Article.create({
            title: title,
            description: description,
            body: body,
            Article_created_in: new Date(),
            Article_deleted_at: null,
            session_id: findSession.token_for_session,
            created_by: findSession.email,
        });
    }
}


export default new ArticleRepository();