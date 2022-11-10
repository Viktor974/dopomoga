import mongo from 'mongoose'

const PostSchema = new mongo.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        tags: {
            type: Array,
            default: [],
        },
        viewsCount: {
            type: Number,
            default: 0,
        },
        user: {
            type: mongo.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        imageUrl: String,
    },
    {
        timestamps: true,
    },
);

export default mongo.model('Post', PostSchema);