import { Router } from 'express'
import q2m from 'query-to-mongo'
import ProductsModel from './schema.js'
import { productBodyValidator, reviewBodyValidator } from '../../middleware/validation.js'
import { validationResult } from 'express-validator'
import createHttpError from 'http-errors'

const proudctRouter = Router()

proudctRouter
    .route('/')
    .get(async(req, res, next) => {
        try {
            const query = q2m(req.query)
            const products = await ProductsModel.find()
                .skip(query.options.skip)
                .limit(query.options.limit)
                .sort(query.options.sort)
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



proudctRouter
    .route('/:id')
    .get(async(req, res, next) => {
        try {
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
        const products = await ProductsModel.findByIdAndDelete(req.params.id)
        console.log(products)
        if (products) {
            res.send("204 - products deleted!")
        } else { res.send("products not found!") }
    } catch (error) {
        next(error)
    }
})

proudctRouter
    .route('/:id/reviews')
    .get(async(req, res, next) => {
        try {
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

export default proudctRouter