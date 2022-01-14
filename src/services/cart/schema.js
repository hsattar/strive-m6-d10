import mongoose from 'mongoose'

const { Schema, model } = mongoose

const cartSchema = new Schema({
    productId: {
        type: String,
        required: true,
        ref: 'Products'
    },
    quantity: {
        type: Number,
        required: true
    }
})

export default model('Cart', cartSchema)