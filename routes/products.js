const {Router} = require('express')
const Products = require('../modules/services')
const router = Router()

router.get('/', async (req, res) => {
    const products = await Products.find().lean()
    res.render('products', {
        title: "Products",
        isProducts: true,
        products
    })
})

router.get('/:id', async (req, res) => {
    const products = await Products.findById(req.params.id).lean()
    res.render('product', {
        layout: 'empty',
        title: `${products.title}`,
        products
    })
})

router.get('/:id/edit', async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/')
    }

    const products = await Products.findById(req.params.id).lean()
    res.render('product-edit', {
        title: `Edit`,
        products
    })
})

router.post('/edit', async (req, res) => {
    const {id} = req.body
    delete req.body.id
    await Products.findByIdAndUpdate(id, req.body).lean()
    res.redirect('/products')
})

router.post('/remove', async (req, res) => {
    try {
        await Products.deleteOne({
            _id: req.body.id
        })
        res.redirect('/products')
    } catch(e) {
        console.log(e)
    }
    
})




module.exports = router