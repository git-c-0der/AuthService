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
    create
}