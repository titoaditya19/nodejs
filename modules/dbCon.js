// var mysql = require('mysql');
// var connection = mysql.createConnection({
module.exports = {
    HOST: "104.154.173.130",
    USER: "root",
    PASSWORD: "Fw5hKZv56zSmbrjf",
    DB: "adityatito",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}
    
// })

// connection.connect((err) => {
//     if (!err) {
//         console.log("DB Connection Success");

//     } else {
//         console.log("Koneksi DB Error")
//     }
// })

// module.exports = connection;