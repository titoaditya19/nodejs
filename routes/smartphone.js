const { response } = require('express');
const express = require('express');
const router = express.Router();

router.get('/smartphone/getAll', (req, res) => {

    conDb.query("SELECT * FROM smartphone", function (err, result, fields){
        if (err) {
            let response = {
                timeStamp: getTimeStamp(),
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

router.get('/smartphone/getById', (req, res) => {
    console.log("id" + req.query.id)
    conDb.query("SELECT * FROM smartphone WHERE id = " + req.query.id, function (err, result, fields){
        
        if (err) {
        
            let response = {
                timeStamp: getTimeStamp(),
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

router.get('/smartphone/getByName', (req, res) => {
    console.log("name: " + req.query.name)
    conDb.query("SELECT * FROM smartphone WHERE name = '" + req.query.name + "'" , function (err, result, fields){
        
        if (err) {
        
            let response = {
                timeStamp: getTimeStamp(),
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

router.post('/smartphone/insert', (req, res) => {
    let values = []
    let query = "INSERT INTO smartphone (id, name, model, display, cpu, gpu, camera, os, battery, color, misc) VALUES ?";
            const element = req.body;
            let data = [element.id, element.name, element.model, element.display, element.cpu, element.gpu, element.camera, element.os, element.battery, element.color, element.misc]
            values.push(data)
        
            conDb.query(query, [values], (err, result, fields) => {
            if (!err) {
                let response = {
                    status: true,
                    message: "Insert smartphone berhasil"
                }
                res.send(response)
            } else {
                let response = {
                    timestamp: getTimeStamp(),
                    status: false,
                    message: "Insert smartphone gagal"
                }
                res.send(response)
            }
        })
    })

router.post('/smartphone/insertMulti', (req, res) => {
        let values = []
        let query = "INSERT INTO smartphone (id, name, model, display, cpu, gpu, camera, os, battery, color, misc) VALUES ?";
                
        for (let index = 0; index < req.body.length; index++) {
            const element = req.body[index];
                let data = [element.id, element.name, element.model, element.display, element.cpu, element.gpu, element.camera, element.os, element.battery, element.color, element.misc]
                values.push(data)
        }
                conDb.query(query, [values], (err, result, fields) => {
                if (!err) {
                    let response = {
                        status: true,
                        message: "Insert multiple smartphone berhasil"
                    }
                    res.send(response)
                } else {
                    let response = {
                        timestamp: getTimeStamp(),
                        status: false,
                        message: "Insert multiple smartphone gagal"
                    }
                    res.send(response)
                }
            })
        })

router.put('/smartphone/update', (req, res) => {
            let id = req.body.id
            let name = req.body.name
            let model = req.body.model
            let display = req.body.display
            let cpu = req.body.cpu
            let gpu = req.body.gpu
            let camera = req.body.camera
            let os = req.body.os
            let battery = req.body.battery
            let color = req.body.color
            let misc = req.body.misc
            conDb.query("UPDATE smartphone SET name = '" + name + "', model = '" + model + "', display = '" + display + "', cpu = '" + cpu + "', gpu = '" + gpu + "', camera = '" + camera + "', os = '" + os + "', battery = '" + battery + "', color = '" + color + "', misc = '" + misc + "' WHERE id = '" + id + "'" , function (err, result, fields){
                console.log('isi : ', req.body);
                if (err) {
                    
                    let response = {
                        timestamp : getTimeStamp(),
                        status: false,
                        message: err.sqlMessage
                    }
                    res.send(response)
                } else {
                let response = {
                        status : true,
                        message : "Berhasil update data"
                    }
                res.send(response)
                }   
            })
        })

router.delete('/smartphone/delete', (req, res) => {
    conDb.query("DELETE FROM smartphone WHERE id = " + req.query.id, function (err, result, fields){
            console.log('id : ', req.query.id);
            if (err) {
                let response = {
                    timestamp : getTimeStamp(),
                    status: false,
                    message: err.sqlMessage
                }
                res.send(response)
                
            } else {
                let response = {
                    status : true,
                    message : "Data berhasil dihapus"
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