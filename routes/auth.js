const {Router} = require("express")
const User = require("./../modules/user")

const router = Router()

router.get("/login", (req, res) => {
    res.render("auth/login", {
        title: "Log In",
        isLogin: true
    })
})

router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/auth/login#login")
    })
})

router.post("/login", async (req, res) => {
    const user = await User.findById('5fb57843c45b0b36c43a734e')
    req.session.user = user
    req.session.isAuthenticated = true

    req.session.save(err => {
        if(err) {
            throw err
        }
        res.redirect("/")
    })
})

module.exports = router