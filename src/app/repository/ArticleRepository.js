import UserSession from '../model/UserSession.js';
import Article from '../model/Article.js';
import slugify from 'slugify';

class ArticleRepository {
    async findSession (token) {
        const findSession = await UserSession.find({token_for_session: token});   

        if (findSession.length === 0) {
            return false;
        }
        return true;
    }

    async checkoutSlug (title) {
        const findSlug = await Article.findOne({title: slugify(title), disconnected_in: null});
        
        if (findSlug === null) {
            return true;
        } 
        return false;
    }

    async newArticle (token, title, description, body) {
        const findSession = await UserSession.findOne({token_for_session: token, disconnected_in: null});

        if (findSession === null) {
            return true;
        } 
        
        await Article.create({
            title: slugify(title),
            description: description,
            body: body,
            Article_created_in: new Date(),
            Article_deleted_at: null,
            last_update: null,
            session_id: findSession.token_for_session,
            created_by: findSession.email,
        });
    }
    
    async findAllArticles () {
        return await Article.find({Article_deleted_at: null}).select({session_id: 0, __v: 0});

    }

    async findOneArticle (slug_ArticleTitle) {
        const slugFind = await Article.findOne({title: slug_ArticleTitle, Article_deleted_at: null}).select({session_id: 0, __v: 0});
        
        if (slugFind === null) {
            return false;
        }
        return slugFind;

    }

    async ownerTheArticle (slug, token) {
        const findOwner = await Article.findOne({title: slug, Article_deleted_at: null});

        if (token != findOwner.session_id) {
            return false;
        }
        return true;
    }

    async existTitle (title) {
        const existTitle = await Article.findOne({title: slugify(title)});

        if (existTitle != null) {
            return false;
        }
        return true;
    }


    async findArticle (slug) {
        const findSlug = await Article.findOne({title: slug, Article_deleted_at: null});

        if (findSlug === null) {
            return false;
        }
            return true;

    }

    async findAndUpDate (slug) {
        const findSlug = await Article.findOne({title: slug, Article_deleted_at: null});

        if (findSlug === null) {
            return false;
        }
        
        await Article.findOneAndUpdate({title: slug}, {Article_deleted_at: new Date()});
            return true;
    }
    
    async UpDate (slug, title, description, body) {
        const verifyTitle = await Article.findOne({title: title, Article_deleted_at: null});

        if (verifyTitle != null) {
            return false;
        }

        await Article.findOneAndUpdate({title: slug, Article_deleted_at: null}, {title:slugify(title), description: description, body: body});
            return true;
    }
}

export default new ArticleRepository();