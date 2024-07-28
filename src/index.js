const express = require('express');
const {PORT} = require('./config/serverConfig')
const bodyParser = require('body-parser')
const apiRoutes = require("./routes/index")
const {User, Role} = require('./models/index')
// const bcrypt = require('bcrypt')
// const db = require('./models/index')
const app = express();

const prepareAndStartServer = () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use('/api', apiRoutes);

    app.listen(PORT, async () => {
        console.log(`Server Started on port ${PORT}.`);
        if(process.env.DB_SYNC){
            db.sequelize.sync({alter: true});
            process.env.DB_SYNC=false
        }
        // const incomingPassword = "helloWorld";
        // const user = await User.findByPk(2);
        // const response = bcrypt.compareSync(incomingPassword, user.password);
        // console.log(response);

        // const u1 = await User.findByPk(2);
        // const r1 = await Role.findByPk(1);
        // u1.addRole(r1);
        // const response = await u1.hasRole(r1);
        // console.log(response);
        
    })
}

prepareAndStartServer();