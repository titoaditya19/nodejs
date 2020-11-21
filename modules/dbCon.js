var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '104.154.173.130',
    user: 'root',
    password: 'Fw5hKZv56zSmbrjf',
    database: 'adityatito'
})

connection.connect((err) => {
    if (!err) {
        console.log("DB Connection Success");

    } else {
        console.log("Koneksi DB Error")
    }
})

module.exports = connection;