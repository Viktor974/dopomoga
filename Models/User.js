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
    role: {
        String,
    },
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
}, {
    timestamps: true,
})

export default mongo.model('User', UserSchema)