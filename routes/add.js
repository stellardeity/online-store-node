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
    const space = new Service(data.title, data.description, data.image, data.price, data.brief_description)

    await space.save()

    res.redirect('/services')
})

module.exports = router