const {Schema, model} = require('mongoose')

const service = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: String
})

module.exports = model('Service', service)