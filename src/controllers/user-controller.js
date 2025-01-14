const UserService = require("../services/user-service");
const userService = new UserService();

const create = async (req, res) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
            success: true,
            data: response,
            message: "User has been created successfully.",
            err: {}
        })
    } catch (error) {
        // console.log('Inside controller', error.statuscode);
        return res.status(error.statuscode).json({
            success: false,
            data: {},
            message: error.message,
            err: error.description
        })
    }
}

const signIn = async (req, res) => {
    try {
        const response = await userService.signIn(req.body.email, req.body.password)
        return res.status(200).json({
            success: true,
            data: response,
            message: "Successfully Signed In.",
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(error.statuscode).json({
            success: false,
            data: {},
            message: error.message,
            err: error.description
        })
    }
}

const isAuthenticated = async (req, res) => {
    try {
        const token = req.headers['x-access-token']
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            success: true,
            data: response,
            message: "User is authenticated and the token is valid.",
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            data: {},
            message: "Something went wrong.",
            err: error
        })
    }
}

const isAdmin = async (req, res) => {
    try {
        const response = await userService.isAdmin(req.body.userId);
        return res.status(200).json({
            success: true,
            data: response,
            message: "Succesfully fetched whether user is admin or not.",
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            data: {},
            message: "Something went wrong.",
            err: error
        })
    }
}

module.exports = {
    create,
    signIn,
    isAuthenticated,
    isAdmin,
}