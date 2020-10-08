const {Router} = require('express')
const Service = require('../modules/services')
const router = Router()

router.get('/', (req, res) => {
    res.render('add', {
        title: "Add new stars",
        isAdd: true
    })
})

router.post('/', async (req, res) => {
    const data = req.body
    const service = new Service({
        title: data.title,
        price: data.price,
        img: data.img
    })

    try {
        await service.save()
        res.redirect('/services')
    } catch (e) {
        console.log(e)
    }
})

module.exports = router