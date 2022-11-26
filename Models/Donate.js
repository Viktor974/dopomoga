import mongo from 'mongoose'

const DonateSchema = new mongo.Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: String,
    type:{
        type: String,
        required: true
    },
    sum: {
        default: 0
    },
    creator: {
        type: mongo.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    country: {
        String,
        default: ''
    },
    city: {
        String,
        default: ''
    },
    email:{
        String,
        type: Array
    },
    phoneNumber:{
        String,
        type: Array
    },
    text: {
        String,
        default: ''
    },
}, {
    timestamps: true,
})

export default mongo.model('Donate', DonateSchema)