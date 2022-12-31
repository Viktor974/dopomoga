import mongoose from 'mongoose'

const DanationSchema = new mongoose.Schema(
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
        sum:{
            type: Number,
            required: true
        },
        viewsCount: {
            type: Number,
            default: 0,
        },
        img:{
            type: String,
            max: 500,
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

export default mongoose.model('Donation', DanationSchema);