import mongoose from "mongoose";

const user = mongoose.model('user',{
    full_name:String,
    email:String,
    password:String,
    cpf:Number,
    birth_date:Date,
    account_created:Date,
    deleted_at: Date,
    last_update:Date,
    admin:Boolean,

}); 

export default user;