const express = require('express') 
const mongoose = require('mongoose')

const path = require('path')

const exphbs = require('express-handlebars')

const homeRoutes = require('./routes/home')
const cardRoutes = require('./routes/card')
const addRoutes = require('./routes/add')
const productRouter = require('./routes/products')

const User = require('./modules/user')

const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(async (req, res, next) => {
    try {
        const user = await User.findById('5f836268472bdc3b2c0ab67d')
        req.user = user
        next()
    } catch (e) {
        console.log(e)
    }
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))

app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/products', productRouter)
app.use('/card', cardRoutes)

const PORT = process.env.PORT || 3000

async function start() {
    try {
        const password = 'HaSse9bqnGRdtxJY'
        const url = `mongodb+srv://maria:${password}@cluster0.lhqg9.mongodb.net/shop`
        await mongoose.connect(url,  {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useFindAndModify: false
        })
        const candidate = await User.findOne()
        if(!candidate) {
            const user = new User({
                email: 'maria@gmail.com',
                name: 'maria',
                card: {items: []}
            })
            await user.save()
        }
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()

