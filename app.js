require('dotenv').config()
//error handler express
require('express-async-errors')

const express = require('express')
const app = express()

const connectDB = require('./db/connect')
const productsRoute = require('./routes/products')
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFound = require('./middleware/not-found')

//middleware
app.use(express.json())

// routes
app.get('/', (req, res) => {
    res.send("<h1>Store Api</h1><a href='/api/v1/products'>Products</a>")
})

// products routes
app.use('/api/v1/products', productsRoute)

app.use(errorHandlerMiddleware)
app.use(notFound)

const PORT = process.env.PORT || 3000

const start = async () => {
    try {
        //connect mongodb
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, console.log(`The app is listing on PORT ${PORT}...`))
    } catch (error) {
        console.log(error);
    }
}
start()
