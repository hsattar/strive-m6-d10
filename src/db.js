import mongoose from 'mongoose'

const connection = async() => {
    try {
        const connectionParams = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        }

        await mongoose.connect(process.env.DB, connectionParams)


    } catch (error) {

    }


}


export default connection