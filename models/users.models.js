// const { Sequelize } = require("sequelize/types");

module.exports = (sequelize, Sequelize) => {
    const users = sequelize.define("users", {
        firstName : {
            type: Sequelize.STRING
        },

        lastName : {
            type: Sequelize.STRING
        },

        username : {
            type: Sequelize.STRING
        },
        
        email : {
            type: Sequelize.STRING
        },

        password : {
            type: Sequelize.STRING
        },

        role : {
            type: Sequelize.STRING
        }
    
    }) 
    return users  
}