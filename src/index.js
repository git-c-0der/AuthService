const express = require('express');
const {PORT} = require('./config/serverConfig')
const bodyParser = require('body-parser')
const apiRoutes = require("./routes/index")
// const {User} = require('./models/index')
// const bcrypt = require('bcrypt')
const app = express();

const prepareAndStartServer = () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use('/api', apiRoutes);

    app.listen(PORT, async () => {
        console.log(`Server Started on port ${PORT}.`);
        // const incomingPassword = "helloWorld";
        // const user = await User.findByPk(2);
        // const response = bcrypt.compareSync(incomingPassword, user.password);
        // console.log(response);
    })
}

prepareAndStartServer();