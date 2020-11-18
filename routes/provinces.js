const { response } = require('express');
const express = require('express');
const router = express.Router();

router.get('/getProvince', (req, res) => {
    conDb.query("SELECT * FROM provinces", function (err, result, fields){
        if (err) {
            var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            var time = today.getHours() + '-' + today.getMinutes() + '-' + today.getSeconds();
            var dateTime = date + '-' + time;

            let response = {
                timeStamp: dateTime,
                status: false,
                message: err.sqlMessage
            }
            res.send(response);
        } else {
            let response = {
                status: true,
                data: result
            }
            res.send(response);
        }

    })
})

router.get('/getProvinceById/', (req, res) => {
    console.log("id" + req.query.id)
    conDb.query("SELECT * FROM provinces WHERE id = " + req.query.id, function (err, result, fields){
        
        if (err) {
            var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            var time = today.getHours() + '-' + today.getMinutes() + '-' + today.getSeconds();
            var dateTime = date + '-' + time;

            let response = {
                timeStamp: dateTime,
                status: false,
                message: err.sqlMessage
            }
            res.send(response);
        } else {
            let response = {
                status: true,
                data: result
            }
            res.send(response);
        }

    })
})

router.post('/insertProvinces', (req, res) => {
    let id = req.body.id
    let alt_name = req.body.alt_name
    let latitude = req.body.latitude
    let longitude = req.body.longitude
    let name = req.body.name
    conDb.query("INSERT INTO provinces (id, alt_name, latitude, longitude, name) VALUES('" + id + "', '" + alt_name + "', '" + latitude + "', '" + longitude + "', '" + name + "')" , function (err, result, fields){
        console.log('isi : ', req.body);
        if (err) {
            var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth() + 1) + '-' + today.getDate();
            var time = today.getHours() + ':' + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date + '-' + time;

            let response = {
                timestamp : dateTime,
                status: false,
                message: err.sqlMessage
            }
            res.send(response)
        } else {
        let response = {
                status : true,
                data : "Berhasil disimpan"
            }
        res.send(response)
        }   
    })
})

router.post('/insertMultiProvinces', (req, res) => {
    let values = []
    let query = "INSERT INTO provinces (id, alt_name, latitude, longitude, name) VALUES ?";
    
        for (let index = 0; index < req.body.length; index++) {
            const element = req.body[index];
            let data = [element.id, element.alt_name, element.latitude, element.longitude, element.name]
            values.push(data)
        }

        conDb.query(query, [values], (err, result, fields) => {
            if (!err) {
                let response = {
                    status: true,
                    message: "Insert multiple province berhasil"
                }
                res.send(response)
            } else {
                let response = {
                    timestamp: getTimeStamp(),
                    status: false,
                    message: "Insert multiple province gagal"
                }
                res.send(response)
            }
        })
  
    })

router.put('/updateProvinces', (req, res) => {
    let id = req.body.id
    let alt_name = req.body.alt_name
    let latitude = req.body.latitude
    let longitude = req.body.longitude
    let name = req.body.name
    conDb.query("UPDATE provinces SET alt_name = '" + alt_name + "', latitude = '" + latitude + "', longitude = '" + longitude + "', name = '" + name + "' WHERE id = '" + id + "'" , function (err, result, fields){
        console.log('isi : ', req.body);
        if (err) {
            var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth() + 1) + '-' + today.getDate();
            var time = today.getHours() + ':' + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date + '-' + time;

            let response = {
                timestamp : dateTime,
                status: false,
                message: err.sqlMessage
            }
            res.send(response)
        } else {
        let response = {
                status : true,
                data : "Berhasil update data"
            }
        res.send(response)
        }   
    })
})

router.delete('/deleteProvincesById', (req, res) => {
    conDb.query("DELETE FROM provinces WHERE id = " + req.query.id, function (err, result, fields){
        console.log('user id ; ', req.query.id);
        if (err) {
            var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth() + 1) + '-' + today.getDate();
            var time = today.getHours() + ':' + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date + '-' + time;

            let response = {
                timestamp : dateTime,
                status: false,
                message: err.sqlMessage
            }
            res.send(response)
            
        } else {
            let result = "berhasil dihapus"
        let response = {
            
            status : true,
                data : result
            }
        res.send(response)
        }
            
        
    })
})

function getTimeStamp(){
    var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth() + 1) + '-' + today.getDate();
            var time = today.getHours() + ':' + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date + '-' + time;
            return dateTime
}
        
module.exports = router;