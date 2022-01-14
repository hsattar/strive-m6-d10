import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import productRouter from './services/products.js'

const { PORT, DB_CONNECTION } = process.env

const port = PORT || 3001

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => res.send('Hello'))
app.use('/products', productRouter)

mongoose.connect(DB_CONNECTION)

mongoose.connection.on('connected', () => {
    console.log('DB Connected')
    app.listen(port, () => console.log(`Server running on port port`))
})

mongoose.connection.on('error', err => console.log('DB Connect Error', err))