import { Router } from 'express'
import CartModel from './schema.js'
import { cartBodyValidator } from '../../middleware/validation.js'
import { validationResult } from 'express-validator'
import createHttpError from 'http-errors'

const cartRouter = Router()

cartRouter.route('/')
.get(async (req, res, next) => {
    try {
        const cart = await CartModel.find().populate('productId')
        res.send(cart)
    } catch (error) {
        console.log(error);
        next(error)
    }
})
.post(cartBodyValidator, async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return next(createHttpError(400, errors))
        const cartItem = await new CartModel(req.body)
        cartItem.save()
        res.status(201).send(cartItem)
    } catch (error) {
        next(error)
    }
})

cartRouter.route('/:cartId')
.get(async (req, res, next) => {
    try {
        if (req.params.cartId.length !== 24) return next(createHttpError(400, 'Invalid ID'))
        const cartItem = await CartModel.findById(req.params.cartId)
        if (!cartItem) return next(createHttpError(404, 'We couldn\'t find the item you were looking for'))
        res.send(cartItem)
    } catch (error) {
        next(error)
    }
})
.put(async (req, res, next) => {
    try {
        if (req.params.cartId.length !== 24) return next(createHttpError(400, 'Invalid ID'))
        const updatedItem = await CartModel.findByIdAndUpdate(req.params.cartId, req.body, { new: true, runValidators: true })
        if (!updatedItem) return next(createHttpError(404, 'We couldn\'t update the item because the id is wrong'))
        res.send(updatedItem)
    } catch (error) {
        next(error)
    }
})
.delete(async (req, res, next) => {
    try {
        if (req.params.cartId.length !== 24) return next(createHttpError(400, 'Invalid ID'))
        const result = await CartModel.findByIdAndDelete(req.params.cartId)
        if (!result) return next(createHttpError(404, 'We couldn\'t delete the item because the id is wrong'))
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
})

export default cartRouter