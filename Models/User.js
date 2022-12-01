import mongo from 'mongoose'

const UserSchema = new mongo.Schema({
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
    passwordHash: {
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
    followers:{
        type:Array,
        default:[]
    },
    followins:{
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

export default mongo.model('User', UserSchema)