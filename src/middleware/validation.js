import { checkSchema } from 'express-validator'

export const productBodyValidator = checkSchema({
    name: {
        in: ['body'],
        isLength: {
            options: { min: 1 },
            errorMessage: 'You must provide a name'
        }
    },
    description: {
        in: ['body'],
        isLength: {
            options: { min: 1 },
            errorMessage: 'You must provide a description'
        }
    },
    brand: {
        in: ['body'],
        isLength: {
            options: { min: 1 },
            errorMessage: 'You must provide a brand'
        }
    },
    imageUrl: {
        in: ['body'],
        isLength: {
            options: { min: 1 },
            errorMessage: 'You must provide a imageUrl'
        }
    },
    price: {
        in: ['body'],
        isLength: {
            options: { min: 1 },
            errorMessage: 'You must provide a price'
        }
    },
    category: {
        in: ['body'],
        isLength: {
            options: { min: 1 },
            errorMessage: 'You must provide a category'
        }
    }
})