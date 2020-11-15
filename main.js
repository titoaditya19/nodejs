const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
app.use(bodyParser.json())

const db = require('./modules/dbCon');
const provinceRoute = require('./routes/provinces');
app.use(provinceRoute);
const smartphoneRoute = require('./routes/smartphone');
app.use(smartphoneRoute);
global.conDb = db

app.get('/hello', function(request, response){
    response.send('Selamat Datang Guys')
})

app.get('/user/:id', function(request, response){
    console.log("User ID : " + request.params.id)

    let result = {
        userid : request.params.id
    }
    response.send(result)
})

app.get('/user/', function(request, response){
    console.log("User ID : " + request.query.id)

    let result = {
        userid: request.query.id
    }
    response.send(result)
})

app.post('/user', (req, res) =>{
    console.log("Client Request : ", JSON.stringify(req.body))
    let result = req.body
    result.message = "Hallo"
    res.send(result)
})

console.log("Server running in port : ", port)
app.listen(3000)

// var modPerkalian = require('./modules/moduleTest');
// modPerkalian.perkalian(4, 3);

// const constVar = "data Konstan";
// var varVar = "data var";

// function name(params){
//     console.log("data constant :", constVar);
//     console.log("data constant :", varVar);
// }

// function iniFunction(nama, umur){
//     console.log("Nama :", nama)
//     console.log("Umur :", umur)
// }

// function funcNilai(nilai){
//     let hasil = "";
//     if (nilai >= 80){
//         hasil = "A";
//     } else if (nilai >= 70){
//         hasil = "B"
//     } else{
//         hasil = "C";
//     }
//     console.log("Hasil :", hasil);
// }

// function functionSwitch(menu) {
//     let hasil = "";
//     switch (menu){
//         case "A":
//             hasil = "Nasi Padang";
//             break;
//         case "B" :
//             hasil = "Sate Ayam";
//             break;
//         default:
//             hasil = "Menu Lain";
//             break;
//     }
//     console.log("Pilihan menu :", hasil);
// }

// function functionFor(jumlah, array) {
//     for (let index = 0; index < jumlah; index++) {
//         console.log("Loop ke : ", index);
//     }

//     array.forEach(element => {
//         console.log("buah :", element);
//     });
// }

// var buah= ["apel", "durian", "mangga", "jambu", "jeruk"];
// iniFunction("Tito", 21);
// funcNilai(70);
// functionSwitch("B");
// functionFor(5, buah);