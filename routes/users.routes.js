const { USER } = require('../models');

module.exports = app => {
    const user = require('../controllers/users.controllers')
    const appService = require("../modules/appService")
    var router = require('express').Router();
    var jwt = require("express-jwt");
    const { adminVerify, userVerify, guestVerify } = require("../modules/middleware");

    var checkAuth = jwt ({
        secret: process.env.JWTSIGN,
        algorithms: ['RS256', 'HS256']
    });

    router.post('/register', checkAuth, user.register);

    router.post('/insert', checkAuth, adminVerify, user.insert);

    router.get('/getAll', checkAuth, adminVerify, user.findAll);

    router.put('/update/:id', checkAuth, adminVerify, user.update);
    // router.put('/update/:id', checkAuth, adminVerify, function(req, res) {
    //     let users = req.user;
    //     let role = users.role;
    //     console.log("Role : ", role);
    //     let id;
    //     id = req.params.id;
    //     console.log("Id : ", id);
    //     console.log("Role ENV : ", process.env.ROLE1)
    //         if (role == process.env.ROLE1){
    //              user.update
    //         }
    // });
        // } else if ((role == process.env.ROLE2) && (user.getId == id)){
        //     user.update;
        //     // res.status(401).send()
        // } else if ((users.role == process.env.ROLE2 && user.getId == id)){
        //     user.update
        //     // res.status(401).send()
        // } else {
        //     res.status(401).send()
        // }
    // });

    router.delete('/delete/:id', checkAuth, adminVerify, user.delete);

    router.put('/changeRole/:id', checkAuth, adminVerify, user.changeRole);

    router.post('/login', user.login);

    //base url untuk user
    app.use('/api/user/', router);
}