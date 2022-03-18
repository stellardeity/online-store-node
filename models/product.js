const {Schema, model} = require('mongoose')

const product = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: String,
    text: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

product.method('toClient', function() {
    const product = this.toObject()

    product.id = product._id
    delete product._id

    return product
})

module.exports = model('Product', product)