import mongoose from 'mongoose'

const { Schema, model } = mongoose

const products = new Schema({

    name: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    category: [{ type: String, ref: "Author" }],
    reviews: [{
        comment: { type: String, required: false },
        rate: { type: Number, required: false },
    }]
})

export default model("Products", products);