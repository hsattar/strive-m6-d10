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
        isInt: true,
        toInt: true,
        errorMessage: 'You must provide a price as a number'
    },
    category: {
        in: ['body'],
        isLength: {
            options: { min: 1 },
            errorMessage: 'You must provide a category'
        }
    }
})

export const reviewBodyValidator = checkSchema({
    comment: {
        in: ['body'],
        isLength: {
            options: { min: 1 },
            errorMessage: 'You must provide a comment'
        }
    },
    rate: {
        in: ['body'],
        isInt: true,
        toInt: true,
        errorMessage: 'You must provide a rating as a number'
    }
})

export const cartBodyValidator = checkSchema({
    productId: {
        in: ['body'],
        isLength: {
            options: [{ min: 24 }, { max: 24 }],
            errorMessage: 'You must provide a productId'
        }
    },
    quantity: {
        in: ['body'],
        isInt: true,
        toInt: true,
        errorMessage: 'You must provide a quantity as a number'
    }
})