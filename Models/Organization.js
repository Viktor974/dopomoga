import mongo from 'mongoose'

const OrganizationSchema = new mongo.Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: String,
    creator:{
        type: mongo.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    users:{
        type: Array,
        default: []
    },
    country: {
        String,
        default: ''
    },
    city: {
        String,
        default: ''
    },
    contact: Array,
    text: {
        String,
        default: ''
    },
}, {
    timestamps: true,
})

export default mongo.model('Organization', OrganizationSchema)