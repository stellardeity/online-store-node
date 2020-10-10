const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')

const mongoose = require('mongoose')

const homeRoutes = require('./routes/home')
const cardRoutes = require('./routes/card')
const addRoutes = require('./routes/add')
const serviceRouter = require('./routes/services')

const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/services', serviceRouter)
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
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()

