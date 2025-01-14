const image = require('../archives/images').default;
const diretorios = require('../archives/folders').default;
const express = require('express');
const conection = require('../bank/Bank').default;
const router = express.Router();

class GameSend {
    database: any;

    public constructor() {
        this.database = new conection('./bd/steam.db');
    }

    private insert(req: any): boolean {
        const { idade, nome, valor, tag, descricao, foto } = req.body;
        let local = new diretorios(`./uploads/${nome}`);
        local.createFolder();
        let upload = new image('main', foto, local.getFolder());
        upload.upload();
        return this.database.insert(`INSERT INTO jogo (Valor, Nome, Tag, idade_minima, Descricao) Values(${valor},'${nome}','${tag}',${idade},'${descricao}');`)
    }

    private async form_error(req: any): Promise<string> {
        const { idade, nome, valor, tag, descricao, foto } = req.body;
        let error = '';

        if (!idade || !nome || !valor || !tag || !descricao || !foto) {
            error += 'Complete all form fields<br>';
        }

        if (nome) {
            const nomeExiste = await this.database.exist('jogo', 'Nome', `"${nome}"`);
            if (nomeExiste) {
                error += 'This name is registered<br>';
            }
        }

        return error;
    }

    public async game_register(): Promise<void> {
        router.post('/uploadGame', async (req: any, res: any) => {
            const erro = await this.form_error(req);
            if (erro) {
                return res.status(400).json({
                    status: 'failed',
                    message: erro,
                });
            }

            const inserted = this.insert(req);
            if (inserted) {
                return res.status(200).json({
                    status: 'success',
                    message: 'Register successfully',
                    campos: req.body
                });
            } else {
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