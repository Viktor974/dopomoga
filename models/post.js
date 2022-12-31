import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        desk: {
            type: String,
            required: true,
            max: 1000,
        },
        tags: {
            type: Array,
            default: [],
        },
        comments:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"comment"
        }],
        viewsCount: {
            type: Number,
            default: 0,
        },
        img:{
            type: String,
            max: 500,
        },
        likes:{
            type: Array,
            default: []
        },
        userId: {
            type: String,
            required: true,
        },
        imageUrl: String,
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Post', PostSchema);