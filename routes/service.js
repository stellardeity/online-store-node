const {Router} = require('express')
const Service = require('../modules/services')
const router = Router()

router.get('/', async (req, res) => {
    const service = await Service.getAll()
    res.render('services', {
        title: "Service",
        isService: true,
        service
    })
})

module.exports = router