import mongoose from 'mongoose'

const { Schema, model } = mongoose

const products = new Schema({

    name: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    category: [{ type: String }],
    reviews: [{
        comment: { type: String, required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
    }]
})

export default model("Product", products);