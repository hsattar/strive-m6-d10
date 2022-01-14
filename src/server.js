import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import listEndpoints from 'express-list-endpoints'
import productRouter from './services/products/index.js'
import cartRouter from './services/cart/index.js'
import { errorHandlers } from './middleware/errorHandlers.js'
import upload from './services/upload/upload.js'
import Grid from 'gridfs-stream'



let gfs;
connection();
const conn = mongoose.connection;
conn.once("open", function() {
    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection("photos");
})

const { PORT, DB_CONNECTION } = process.env

const port = PORT || 3001

const app = express()

app.use(express.json())
app.use(cors())

// =========  END POINTS ================

app.get('/', (req, res) => res.send('Hello'))
app.use('/products', productRouter)
app.use('/cart', cartRouter)

//  =========  media routes =================
app.use("/file", upload)

app.get('file/:filename', async(req, res, next) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });
        const readStream = gfs.createReadStream(file.filename);
        readStream.pipe(res)
    } catch (error) {
        next("file not found")
    }

})

app.delete("/file/:filename", async(req, res, next) => {
        try {
            await gfs.files.deleteOne({ filename: req.params.filename });
            res.send("deleted")
        } catch (error) {
            next(error)
        }


    })
    //  ========== error handlers =============

app.use(errorHandlers)


// ============  CONNECTION =================
mongoose.connect(process.env.DB_CONNECTION)

mongoose.connection.on('connected', () => {
    console.log('DB Connected')
    app.listen(port, () =>
        console.table(listEndpoints(server)), console.log(`Server running on port ${port}`))
})

mongoose.connection.on('error', err => console.log('DB Connect Error', err))