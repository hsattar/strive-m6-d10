export const errorHandlers = (err, req, res, next) => {
    switch(err.name) {
        case 'ValidationError': 
        case 'BadRequestError': 
        case 'CastError': 
        case 'TypeError': 
        case 'ObjectParameterError': 
            res.status(400).send(err)
            break
        case 'NotFoundError': 
            res.status(404).send(err)        
            break
        default: 
            res.status(500).send('Server Error')
    }
}