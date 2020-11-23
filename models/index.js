const dbConfig = require("../modules/dbCon")
const Sequilize = require("sequelize")

const sequelizeConf = new Sequilize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorAliases: 0,
    pool: {
        max : dbConfig.max,
        min : dbConfig.min,
        acquire : dbConfig.acquire,
        idle : dbConfig.idle
    }
})

const db = {};
db.Sequilize = Sequilize;
db.sequilize = sequelizeConf;

db.USER = require("./users.models.js")(sequelizeConf, Sequilize)

module.exports = db
