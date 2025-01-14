"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const path = require('path');
const app = express();
const formRouter = require('./form_send');
const bodyParser = require('body-parser');
class Routes {
    constructor() {
        app.use(express.static(path.join(__dirname, '../../../public'), { extensions: ['html', 'css', 'js', 'ttf', 'jpeg', 'svg'] }));
        app.use(express.json());
        app.use(bodyParser.json({ limit: '512mb' }));
        app.use('/gamesend', formRouter);
    }
    index() {
        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, path.join('../../../public/html', 'principal.html')));
        });
    }
    register() {
        app.get('/cadastrar_jogo.html', (req, res) => {
            res.sendFile(path.join(__dirname, path.join('../../../public/html', 'cadastrar_jogo.html')));
        });
    }
    start(porta) {
        this.index();
        this.register();
        app.listen(porta, () => {
            console.log('Server started in the localhost 8080');
        });
    }
}
exports.default = Routes;
