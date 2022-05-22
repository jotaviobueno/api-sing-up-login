import mongoose from "mongoose";

const Article = mongoose.model('Article', {
    title:String,
    description:String,
    body:String,
    Article_created_in:Date,
    Article_deleted_at: Date,
    session_id:String,
    created_by:String,
});


export default Article;