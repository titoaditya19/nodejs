const db = require("../models")
const user = db.USER
const Op = db.Sequilize.Op;
const utility = require("../modules/utility.js")
const appService = require("../modules/appService.js")
var jwt = require("jsonwebtoken");
const { response } = require("express");
const { sequilize } = require("../models");

exports.register = (req, res) => {
    let reqBody = req.body
    reqBody.password = utility.hashPassword(req.body.password);
    let body = {
        username : req.body.username,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.lastName,
        password : reqBody.password,
        role : "guest"
    }
   
    console.log("Hash Password : ", body.password);
    console.log("Body : ", body);
    user.create(body)
        .then(result => {
            let message = {
                success : true,
                message: "Register new user success"
            }
            res.send(message)
        })
        .catch(err => {
            let message = {
                success: false,
                message: "Register new user gagal"
            }
            
           res.status(500).res.send(message);
        })
}

exports.insert = (req, res) => {
    let reqBody = req.body
    reqBody.password = utility.hashPassword(req.body.password);
    console.log("Hash Password : ", reqBody.password);
    console.log("Body : ", reqBody);
    user.create(reqBody)
        .then(result => {
            let message = {
                success : true,
                message: "Insert new user success"
            }
            res.send(message)
        })
        .catch(err => {
            let message = {
                success: false,
                message: "Insert new user gagal"
            }
            
           res.status(500).res.send(message);
        })
}

exports.findAll = (req, res) => {
    user.findAll()
        .then(result => {
            let response = {
                    username: result.username,
                    firstName: result.firstName,
                    lastName: result.lastName,
                    email: result.email,
                    role: result.role
                }
            let message = {
                success : true,
                data: result 
            }
            res.send(message)
        })
        .catch(err => {
            let message = {
                success: false,
                message: "Error : " + err
            }
            
           res.status(500).res.send(message);
        })
}

exports.update = (req, res) => {
    let body = req.body
    console.log("Body", body);
    user.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(result => {
            let afectedRow = result[0];
            if (afectedRow > 0) {
                let message = {
                success : true,
                message: "Insert update success"
            }
            res.send(message)
            } else {
                let message = {
                    success : false,
                    message: "Insert update failed"
                }
            res.send(message)
            }

        })
        .catch(err => {
            let message = {
                success: false,
                message: "Error : " + err

            }
            res.send(message)
        })
}

// exports.updateUserGuest = (req, res) => {
//     user.update(req.body, {
//         where: {
//             id: req.params.id
//         }
//     })
//         .then(result => {
//             let afectedRow = result[0];
//             if (afectedRow > 0) {
//                 let message = {
//                 success : true,
//                 message: "Insert update success"
//             }
//             res.send(message)
//             } else {
//                 let message = {
//                     success : false,
//                     message: "Insert update failed"
//                 }
//             res.send(message)
//             }

//         })
//         .catch(err => {
//             let message = {
//                 success: false,
//                 message: "Error : " + err

//             }
//             res.send(message)
//         })
// }

exports.delete = (req, res) => {
    user.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(result => {
            if (result > 0) {
                let message = {
                success : true,
                message: "User Delete success"
            }
            res.send(message)
            } else {
                let message = {
                    success : false,
                    message: "User Delete failed"
                }
            res.send(message)
            }

        })
        .catch(err => {
            let message = {
                success: false,
                message: "Failed Error : " + err

            }
            res.send(message)
        })
}

exports.login = (req, res) => {
    let body = req.body;
    console.log("Body", body);
    user.findOne({where: { username: body.username } })
    .then(result => {
        // console.log("Result : ", result);
        if (result) {
           let compareResult = utility.comparePass(body.password, result.password); 
           if (compareResult) {
               exports.getId = result.id;
               let id = result.id
               console.log("ID", id);
            let response = {
                username: result.username,
                firstName: result.firstName,
                lastName: result.lastName,
                email: result.email,
                role: result.role
            }
            appService.setUser(response);
            console.log("Value : ", process.env.JWTSIGN);
            let token = jwt.sign(response, process.env.JWTSIGN, {expiresIn: '24h'});
            response.token = token;
            appService.setToken(token);
            let resResponse = {
                success: true,
                data: response
            }
            res.send(resResponse)
           }else{
                res.status(401).send(err.message);
           }
        } else {
            res.status(401).send(err);
        }
    })
    .catch(err => {
        console.log("Error: ", err);
        let response = Object.assign(err, {timeStamp: utility.getTimeStamp()})
        response.message = "Error : " + err;
        res.status(500).send(response);
    })
}

exports.changeRole = (req, res) => {
            let role = req.body.role
            let id = req.params.id
            sequilize.query("UPDATE users SET role = '" + role + "' WHERE id = '" + id + "'")
                .then(result => {
                    // let afectedColumn = result;
                    if (result) {
                        let message = {
                        success : true,
                        message: "Change Role success"
                    }
                    res.send(message)
                    } else {
                        let message = {
                            success : false,
                            message: "Change Role invalid"
                        }
                    res.send(message)
                    }
        
                })
                .catch(err => {
                    let message = {
                        success: false,
                        message: "Error : " + err
        
                    }
                    res.send(message)
                })
        }

        