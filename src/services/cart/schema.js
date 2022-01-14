import mongoose from 'mongoose'

const { Schema, model } = mongoose

const cartSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        required: true
    }
})

export default model('Cart', cartSchema)