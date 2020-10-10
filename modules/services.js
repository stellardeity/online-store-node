const {Schema, model} = require('mongoose')

const service = new Schema({
    title: {
        type: String,
        required: true
    },
    brief_description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: String,
    description: {
        type: String,
        required: true
    },
})

module.exports = model('Service', service)