module.exports = app => {
    const socket = require('../controllers/socket.controller')
    var router = require('express').Router();

    router.get('/chat', socket.index);

    app.use('/socket', router);
}