import mongoose from 'mongoose'

const commentSchema = mongoose.Schema({
    comment:{
        type:String,
        required:true
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'post',
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    like:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }],
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    }
})

export default mongoose.model('comment' , commentSchema);