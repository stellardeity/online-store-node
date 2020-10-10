const {Router} = require('express')
const Service = require('../modules/services')
const router = Router()

router.get('/', async (req, res) => {
    const service = await Service.find().lean()
    res.render('services', {
        title: "Services",
        isService: true,
        service
    })
})

router.get('/:id', async (req, res) => {
    const service = await Service.findById(req.params.id).lean()
    res.render('service', {
        layout: 'empty',
        title: `${service.title}`,
        service
    })
})

router.get('/:id/edit', async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/')
    }

    const service = await Service.findById(req.params.id).lean()
    res.render('service-edit', {
        title: `Редактировать ${service.title}`,
        service
    })
})

router.post('/edit', async (req, res) => {
    const {id} = req.body
    delete req.body.id
    await Service.findByIdAndUpdate(id, req.body).lean()
    res.redirect('/services')
})

router.post('/remove', async (req, res) => {
    try {
        await Service.deleteOne({
            _id: req.body.id
        })
        res.redirect('/services')
    } catch(e) {
        console.log(e)
    }
    
})




module.exports = router