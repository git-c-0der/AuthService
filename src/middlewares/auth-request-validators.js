const validateUserAuth = (req, res, next) => {
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            message: "Invalid Request",
            err: "Missing required details!!",
            data: {},
            success: false
        })
    }
    next();
}

module.exports = {
    validateUserAuth
}