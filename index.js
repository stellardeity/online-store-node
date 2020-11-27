const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require("connect-mongodb-session")(session)

const path = require('path')

const exphbs = require('express-handlebars')
const varMiddleware = require('./middleware/variables')

const homeRoutes = require('./routes/home')
const cardRoutes = require('./routes/card')
const addRoutes = require('./routes/add')
const productRouter = require('./routes/products')
const orderRouter = require('./routes/orders')
const authRouter = require("./routes/auth")


const app = express()
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
})
const password = 'HaSse9bqnGRdtxJY'
const MONGODB_URL = `mongodb+srv://maria:${password}@cluster0.lhqg9.mongodb.net/shop`

const store = new MongoStore({
    collection: 'sessions',
    uri: MONGODB_URL,
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: 'some secret value',
    resave: false,
    saveUninitialized: false,
    store
}))
app.use(varMiddleware)

app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/products', productRouter)
app.use('/card', cardRoutes)
app.use('/orders', orderRouter)
app.use('/auth', authRouter)

const PORT = process.env.PORT || 3000

async function start() {
    try {
        await mongoose.connect(MONGODB_URL, {
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

