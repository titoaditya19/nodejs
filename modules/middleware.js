var jwt = require("jsonwebtoken");
const usersModels = require("../models/users.models");
const users = require('../controllers/users.controllers')

var id
var user
exports.adminVerify = function(req, res, next){
    user = req.user;
    id = req.params.id
    console.log("Params ID :", id);
    if (!user) {
        res.status(401).send();
    }

    if (user.role === process.env.ROLE1) {
        next();
    } else if (user.role == process.env.ROLE2 && users.getId == id) {
        next();
    } else if (user.role == process.env.ROLE3 && users.getId == id){
        next();
    } else {
        res.status(401).send();
    }
}