import { Router } from 'express'
import q2m from 'query-to-mongo'
import ProductsModel from './schema.js'
import { productBodyValidator, reviewBodyValidator } from '../../middleware/validation.js'
import { validationResult } from 'express-validator'
import createHttpError from 'http-errors'
import { productData } from '../../data/products.js'

const proudctRouter = Router()

proudctRouter.route('/')
.get(async(req, res, next) => {
    try {
        const query = q2m(req.query)
        const products = await ProductsModel.find(query.criteria)
        .sort(query.options.sort)
        .skip(query.options.skip)
        .limit(query.options.limit || 5)
        res.status(200).send(products)
    } catch (error) {
        next(error)
    }
})
.post(productBodyValidator, async(req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return next(createHttpError(400, errors))
        const products = await ProductsModel(req.body)
        const { _id } = await products.save()
        res.status(201).send({ _id })
    } catch (error) {
        next(error)
    }
})


proudctRouter.post('/bulk-upload', async(req, res, next) => {
    try {
        const products = await ProductsModel.insertMany(productData)
        res.send(products)
    } catch (error) {
        next(error)
    }
})


proudctRouter.get('/search', async(req, res, next) => {
    try {
        // const products = await ProductsModel.find({ $or: [
        //     { name: `/.*${req.query.query}.*/` },
        //     { description: `/.*${req.query.query}.*/` },
        //     { brand: `/.*${req.query.query}.*/` }
        // ]})
        const products = await ProductsModel.find()
        res.send(products)
    } catch (error) {
        next(error)
    }
})


proudctRouter.route('/:id')
.get(async(req, res, next) => {
    try {
        if (req.params.id.length !== 24) return next(createHttpError(400, 'Invalid ID'))
        const products = await ProductsModel.findById(req.params.id)
        if (products === null) { "this products doesn't exist" } else {
            res.send(products)
        }
    } catch (error) {
        next(error)
    }
})
.put(async(req, res, next) => {
    try {
        if (req.params.id.length !== 24) return next(createHttpError(400, 'Invalid ID'))
        const products = await ProductsModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (products === null) { "this products doesn't exist" } else {
            res.send(products)
        }
    } catch (error) {
        next(error)
    }
})
.delete(async(req, res, next) => {
    try {
        if (req.params.id.length !== 24) return next(createHttpError(400, 'Invalid ID'))
        const products = await ProductsModel.findByIdAndDelete(req.params.id)
        console.log(products)
        if (products) {
            res.send("204 - products deleted!")
        } else { res.send("products not found!") }
    } catch (error) {
        next(error)
    }
})


proudctRouter.route('/:id/reviews')
.get(async(req, res, next) => {
    try {
        if (req.params.id.length !== 24) return next(createHttpError(400, 'Invalid ID'))
        const products = await ProductsModel.findById(req.params.id)
        if (products) {
            res.send(products.reviews)
        } else { res.send("") }
    } catch (error) {
        next(error)
    }
})
.post(reviewBodyValidator, async(req, res, next) => {
    try {
        if (req.params.id.length !== 24) return next(createHttpError(400, 'Invalid ID'))
        const errors = validationResult(req)
        if (!errors.isEmpty()) return next(createHttpError(400, errors))
        const updateProductWithComment = await ProductsModel.findByIdAndUpdate(req.params.id, {
            $push: { reviews: req.body },
        }, { new: true })
        if (updateProductWithComment) {
            res.send(updateProductWithComment)
        } else { console.log("there are no product to update") }
    } catch (error) {
        next(error)
    }
})

proudctRouter.route('/:id/reviews/:reviewId')
.put(async(req, res, next) => {
    try {
        if (req.params.id.length !== 24) return next(createHttpError(400, 'Invalid ID'))
        if (req.params.reviewId.length !== 24) return next(createHttpError(400, 'Invalid ID'))
        const { id, reviewId } = req.params
        const product = await ProductsModel.findById(id)
        if (!product) return next(createHttpError(404, 'Cannot find a prouduct with the id provided'))
        const reviewIndex = await product.reviews.findIndex(({ _id }) => _id.toString() === reviewId)
        if (!reviewId) return next(createHttpError(404, 'Cannot find a review with the id provided'))
        product.reviews[reviewIndex] = { ...product.reviews[reviewIndex].toObject(), ...req.body }
        product.save()
        res.send(product.reviews[reviewIndex])
    } catch (error) {
        next(error)
    }
})
.delete(async(req, res, next) => {
    try {
        if (req.params.id.length !== 24) return next(createHttpError(400, 'Invalid ID'))
        if (req.params.reviewId.length !== 24) return next(createHttpError(400, 'Invalid ID'))
        const { id, reviewId } = req.params
        const product = await ProductsModel.findById(id)
        if (!product) return next(createHttpError(404, 'Cannot find a prouduct with the id provided'))
        const review = product.reviews.find(({ _id }) => _id.toString() === reviewId)
        if (!review) return next(createHttpError(404, 'Cannot find a review with the id provided'))
        const updatedProduct = await ProductsModel.findByIdAndUpdate(id, { $pull: { reviews: review } })
       res.sendStatus(204)
    } catch (error) {
        next(error)
    }
})

export default proudctRouter