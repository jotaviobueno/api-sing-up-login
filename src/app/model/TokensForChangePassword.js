import mongoose from "mongoose";

const TokensForChangePassword = mongoose.model('TokensForChangePassword',{
    email:String,
    token_for_change_password:String,
    token_created_in:Date,
    token_expires_in:Date,
    token_expired:Date

});

export default TokensForChangePassword;