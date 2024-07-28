const {ServerErrorCodes} = require('./error-codes')

class AppError extends Error{
    constructor(
        name = 'AppError',
        message = 'Something went wrong',
        description = 'Something went wrong',
        statuscode = ServerErrorCodes.INTERNAL_SERVER_ERROR
    ){
        super();
        this.name = name,
        this.message = message,
        this.description = description,
        this.statuscode = statuscode
    }
}

module.exports = AppError;