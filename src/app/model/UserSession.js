import mongoose from "mongoose";

const Session = mongoose.model('Session',{
    email:String,
    token_for_session:String,
    token_created_in:Date,
    token_expires_in:Date,
    disconnected_in:Date

});

export default Session;