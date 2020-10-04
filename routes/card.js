const {Router} = require('express')
const Card = require('./../modules/card')
const Service = require('./../modules/services')
const router = Router()

router.post('/add', async (req, res) => {
    const service = await Service.getById(req.body.id)
    await Card.add(service)
    res.redirect('/card')
})

router.get('/', async (req, res) => {
    const card = await Card.fetch()
    res.render('card', {
        title: 'Корзина',
        isCard: true,
        services: card.services,
        price: card.price
    })
})

module.exports = router