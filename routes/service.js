const {Router} = require('express')
const Service = require('../modules/services')
const router = Router()

router.get('/', async (req, res) => {
    const service = await Service.getAll()
    res.render('services', {
        title: "Services",
        isService: true,
        service
    })
})

router.get('/:id', async (req, res) => {
    const service = await Service.getById(req.params.id)
    res.render('service', {
        title: `Service ${service.title}`,
        service
    })
})

module.exports = router