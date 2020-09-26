const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('space', {
        title: "Space",
        isSpace: true
    })
})

module.exports = router