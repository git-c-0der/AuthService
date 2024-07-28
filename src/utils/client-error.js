const AppError = require('./error-handler')
const {ClientErrorCodes} = require('./error-codes')

class ClientError extends AppError{    
    constructor(name, message, explanation, statuscode){

        super(
            name,
            message,
            explanation,
            statuscode
        )
    }
}

module.exports = ClientError;