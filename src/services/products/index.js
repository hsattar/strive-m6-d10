import { Router } from 'express'

const productRouter = Router()

productRouter.route('/')
.get(async (req, res, next) => {
    try {
        res.send('GET')
    } catch (error) {
        next(error)
    }
})
.post(async (req, res, next) => {
    try {
        res.send('POST')
    } catch (error) {
        next(error)
    }
})

productRouter.route('/:id')
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

export default productRouter