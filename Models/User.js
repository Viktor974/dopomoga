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
    },
    passwordHash: {
        type: String,
        required: true
    },
    avatarUrl: String,
    country: {
        String,
        default: ''
    },
    city: {
        String,
        default: ''
    },
    birthday: {
        String,
        default: ''
    },
    phoneNumber: {
        String,
        default: ''
    },
    biography: {
        String,
        default: ''
    },
}, {
    timestamps: true,
})

export default mongo.model('User', UserSchema)