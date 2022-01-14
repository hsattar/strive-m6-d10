import { Router } from 'express'
import CartModel from './schema.js'
import { cartBodyValidator } from '../../middleware/validation.js'
import { validationResult } from 'express-validator'
import createHttpError from 'http-errors'

const cartRouter = Router()

cartRouter.route('/')
.get(async (req, res, next) => {
    try {
        const cart = await CartModel.find()
        res.send(cart)
    } catch (error) {
        next(error)
    }
})
.post(cartBodyValidator, async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return next(createHttpError(400, errors))
        const cartItem = await new CartModel(req.body)
        cartItem.save()
        res.send(cartItem)
    } catch (error) {
        next(error)
    }
})

cartRouter.route('/:id')
.get(async (req, res, next) => {
    try {
        res.send('GET ID')
    } catch (error) {
        next(error)
    }
})
.put(async (req, res, next) => {
    try {
        res.send('PUT')
    } catch (error) {
        next(error)
    }
})
.delete(async (req, res, next) => {
    try {
        res.send('DELETE')
    } catch (error) {
        next(error)
    }
})

export default cartRouter