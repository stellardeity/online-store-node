const {Router} = require('express')
const Product = require('../modules/services')
const router = Router()

router.get('/', (req, res) => {
    res.render('add', {
        title: "Adding",
        isAdd: true
    })
})

router.post('/', async (req, res) => {
    const data = req.body
    const product = new Product({
        title: data.title,
        price: data.price,
        img: data.img,
        text: data.text,
        userId: req.user
    })

    try {
        await product.save()
        res.redirect('/products')
    } catch (e) {
        console.log(e)
    }
})

module.exports = router