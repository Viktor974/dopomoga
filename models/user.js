import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    fullName: {
        type: String,
        required: true,
        min: 3,
        max: 30,
    },
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatarUrl: String,
    country: {
        type: String,
    },
    city: {
        String,
    },
    birthday: {
        String,
    },
    phoneNumber: {
        String,
    },
    biography: {
        String,
    },
    posts:{
        type:Array,
        default:[]
    },
    followers:{
        type:Array,
        default:[]
    },
    followings:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    relationship:{
        type: Number,
        enum: [1, 2, 3],
    }
}, {
    timestamps: true,
})

export default mongoose.model('User', UserSchema)