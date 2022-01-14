import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import listEndpoints from 'express-list-endpoints'
import productRouter from './services/products/index.js'
import cartRouter from './services/cart/index.js'
import { errorHandlers } from './middleware/errorHandlers.js'

const { PORT, DB_CONNECTION } = process.env

const port = PORT || 3001

const app = express()

app.use(express.json())
app.use(cors())

// =========  END POINTS ================

app.get('/', (req, res) => res.send('Hello'))
app.use('/products', productRouter)
app.use('/cart', cartRouter)

app.use(errorHandlers)


// ============  CONNECTION =================
mongoose.connect(process.env.DB_CONNECTION)

mongoose.connection.on('connected', () => {
    console.log('DB Connected')
    app.listen(port, () =>
        console.table(listEndpoints(server)), console.log(`Server running on port ${port}`))
})

mongoose.connection.on('error', err => console.log('DB Connect Error', err))