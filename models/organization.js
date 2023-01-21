import mongoose from 'mongoose'

const OrganizationSchema = new mongoose.Schema(
    {
        name: {
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
        img: {
            type: Array,
            default: []
        },
        email: [{
            type: String,
            required: true
        }],
        direction: [{
            type: String,
            required: true
        }],
        site: [{
            type: String,
            required: true
        }],
        actualAddress: [{
            type: String,
            required: true
        }],
        legalAddress: [{
            type: String,
            required: true
        }],
        contacts: [{
            type: String
        }],
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        },
        users: [{
            type: Array,
            ref: "user",
        }]

    },
    {
        timestamps: true,
    },
);

export default mongoose.model('organization', OrganizationSchema);