const UserRepository = require("../repository/user-repository")
const {JWT_KEY} = require("../config/serverConfig")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserService{
    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data){
        try {
            const user = await this.userRepository.create(data);
            return user;            
        } catch (error) {
            console.log("Something went wrong at the service layer.");
            throw {error};
        }
    }

    createToken(user){
        try {
            const result = jwt.sign(user, JWT_KEY, {expiresIn: '1h'}); 
            return result;           
        } catch (error) {
            console.log("Something went wrong during token creation.");
            throw {error};
        }
    }

    validateToken(token){
        try {
            const response = jwt.verify(token, JWT_KEY);    
            return response;        
        } catch (error) {
            console.log(`Something went wrong during token validation.\n ${error}`);
            throw {error};
        }
    }

    async isAuthenticated(token){
        try {
            const response = this.validateToken(token);
            if(!response) throw {error: "Token is not verified."}
            const user = await this.userRepository.getById(response.id);
            if(!user) throw {error: "Such a user does not exist."}
            return user.id;        
        } catch (error) {
            console.log(`Something went wrong during token validation.\n ${error}`);
            throw {error};
        }
    }

    async signIn(email, plainPassword){
        try {
            // Step 1 - Find the user by the email whether it exist or not
            const user = await this.userRepository.getByEmail(email);

            // Step 2 - Compare the password in the database with the one sent.
            const pswdMatch = this.checkPassword(plainPassword, user.password);

            // Step 3 - If password does not match.
            if(!pswdMatch){
                console.log("Password doesn't match.");
                throw {error: "Incorrect Password"}
            }

            // Create and return a new JWT token.
            const newJWT = this.createToken({email: user.email, id: user.id});
            return newJWT;
        } catch (error) {
            console.log(`Something went wrong during token validation.\n ${error}`);
            throw {error};
        }
    }

    checkPassword(userInputPassword, encryptedPassword){
        try {
            return bcrypt.compareSync(userInputPassword, encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in password comparison.");
            throw {error};
        }
    }
}

module.exports = UserService;