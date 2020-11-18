const {Router} = require("express")

const router = Router()

router.get("/login", (req, res) => {
    res.render("auth/login", {
        title: "Log In",
        isLogin: true
    })
})

module.exports = router