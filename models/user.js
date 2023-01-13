import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    fullName: {
        type: String,
        required: true
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
    profile_pic: {
        type:String,
        default:"https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?b=1&s=612x612&w=0&k=20&c=gq94kIlhv7wf-8YRE4LYTN2U46OxB4DStMU9FrSgXY0="
    },
    gender:{
        type:String,
        default:"male"
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
    mobile: {
        String,
    },
    biography: {
        String,
    },
    posts:{
        type:Array,
        default:[]
    },
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }],
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }],
    isAdmin:{
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
})

export default mongoose.model('user', UserSchema)