"use strict";
const image = require('../archives/images').default;
const diretorios = require('../archives/folders').default;
const express = require('express');
const conexao = require('../bank/Bank').default;
const router = express.Router();
class GameSend {
    banco;
    constructor() {
        this.banco = new conexao('./bd/steam.db');
    }
    insert(req) {
        const { idade, nome, valor, tag, descricao, foto } = req.body;
        let local = new diretorios(`./uploads/${nome}`);
        local.createFolder();
        let upload = new image('main', foto, local.getFolder());
        upload.upload();
        return this.banco.insert(`INSERT INTO jogo (Valor, Nome, Tag, idade_minima, Descricao) Values(${valor},'${nome}','${tag}',${idade},'${descricao}');`);
    }
    async form_error(req) {
        const { idade, nome, valor, tag, descricao, foto } = req.body;
        let error = '';
        if (!idade || !nome || !valor || !tag || !descricao || !foto) {
            error += 'Complete all form fields<br>';
        }
        if (nome) {
            const nomeExiste = await this.banco.exist('jogo', 'Nome', `"${nome}"`);
            if (nomeExiste) {
                error += 'This name is registered<br>';
            }
        }
        return error;
    }
    async game_register() {
        router.post('/registra-jogo', async (req, res) => {
            const erro = await this.form_error(req);
            if (erro) {
                return res.status(400).json({
                    status: 'failed',
                    message: erro,
                });
            }
            // Tentar inserir no banco de dados
            const inserted = this.insert(req);
            if (inserted) {
                return res.status(200).json({
                    status: 'success',
                    message: 'Register successfully',
                    campos: req.body
                });
            }
            else {
                return res.status(500).json({
                    status: 'failed',
                    message: 'Error to insert the game<br>'
                });
            }
        });
    }
}
const gameSend = new GameSend();
gameSend.game_register();
module.exports = router;
