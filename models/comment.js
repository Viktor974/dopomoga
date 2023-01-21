import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
        comment: {
            type: String,
            required: true
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post',
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        },
        like: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }]
    }, {
        timestamps: true,
    },
)

export default mongoose.model('comment', commentSchema);