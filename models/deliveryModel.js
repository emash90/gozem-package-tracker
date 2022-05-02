const mongoose = require('mongoose')
const Package = require('./packageModel')
const User = require('../models/userModel')

const deliverySchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    package_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package',
        required: false
    },
    pickup_time: {
        type: String,
        required: true
    },
    start_time: {
        type: String,
        required: true
    },
    end_time: {
        type: String,
        required: true
    },
    location: {
        latitude: {
            type: Number,
            required: false
        },
        longitude: {
            type: Number,
            required: false
        }
    },
    status: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Delivery = mongoose.model('Delivery', deliverySchema)

module.exports = Delivery