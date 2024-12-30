"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const app = express();
const imagem = require('../arquivos/imagens').default;
const diretorios = require('../arquivos/diretorios').default;
const conexao = require('../banco/Banco').default;
class rotas {
    constructor() {
        app.use(express.static(path.join(__dirname, '../../../public'), { extensions: ['html', 'css', 'js', 'ttf', 'jpeg', 'svg'] }));
        app.use(express.json());
        app.use(bodyParser.json({ limit: '512mb' }));
    }
    index() {
        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, path.join('../../../public/html', 'principal.html')));
        });
    }
    cadastrar() {
        app.get('/cadastrar_jogo.html', (req, res) => {
            res.sendFile(path.join(__dirname, path.join('../../../public/html', 'cadastrar_jogo.html')));
        });
    }
    insert(req) {
        const { idade, nome, valor, tag, descricao, foto } = req.body;
        let local = new diretorios(`./uploads/${nome}`);
        local.criarPasta();
        let upload = new imagem('main', foto, local.getPasta());
        upload.upload();
        var banco = new conexao('./bd/steam.db');
        if (banco.insert(`INSERT INTO jogo (Valor,Nome,Tag,idade_minima,Descricao) Values(${valor},'${nome}','${tag}',${idade},'${descricao}');`)) {
            return true;
        }
        else {
            return false;
        }
    }
    async erro_de_preencimento(req) {
        const { idade, nome, valor, tag, descricao, foto } = req.body;
        let erro = '';
        // Verificar campos obrigatórios
        if (!idade || !nome || !valor || !tag || !descricao || !foto) {
            erro += 'Preencha todos os campos<br>';
        }
        // Verificar se o nome já existe no banco de dados
        if (nome) {
            const banco = new conexao('./bd/steam.db');
            const nomeExiste = await banco.existe('jogo', 'Nome', `"${nome}"`); // Ajustado para não usar aspas adicionais
            console.log(nomeExiste);
            if (nomeExiste) {
                erro += 'Esse nome já existe<br>';
            }
        }
        return erro;
    }
    async registrajogo() {
        app.post('/registra-jogo', async (req, res) => {
            // Verificar erros de preenchimento
            const erro = await this.erro_de_preencimento(req);
            if (erro) {
                return res.status(400).json({
                    status: 'failed',
                    message: erro,
                });
            }
            // Tentar inserir no banco de dados
            const inserido = await this.insert(req);
            if (inserido) {
                return res.status(200).json({
                    status: 'success',
                    message: 'Registro feito com sucesso',
                    campos: req.body,
                });
            }
            else {
                return res.status(500).json({
                    status: 'failed',
                    message: 'Erro ao inserir o registro no banco de dados.',
                });
            }
        });
    }
    iniciaservidor(porta) {
        this.index();
        this.registrajogo();
        this.cadastrar();
        app.listen(porta, () => {
            console.log('Servidor iniciado na porta 8080');
        });
    }
}
exports.default = rotas;
