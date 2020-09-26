const {Router} = require('express')
const Space = require('../modules/space')
const router = Router()

router.get('/', (req, res) => {
    res.render('add', {
        title: "Add new stars",
        isAdd: true
    })
})

router.post('/', async (req, res) => {
    const space = new Space(req.body.title, req.body.description, req.body.image)

    await space.save()

    res.redirect('/space')
})

module.exports = router