const express = require('express');
const path = require('path');
const app = express();
const formRouter = require('./form_send');
const bodyParser = require('body-parser');

class Routes {
    public constructor() {
        app.use(express.static(path.join(__dirname, '../../../public'), { extensions: ['html', 'css', 'js', 'ttf', 'jpeg', 'svg'] }));
        app.use(express.json());
        app.use(bodyParser.json({ limit: '512mb' }));
        app.use('/gamesend', formRouter);
    }

    private index() {
        app.get('/', (req: any, res: any) => {
            res.sendFile(path.join(__dirname, path.join('../../../public/html', 'principal.html')));
        });
    }

    private register() {
        app.get('registeredGame', (req: any, res: any) => {
            res.sendFile(path.join(__dirname, path.join('../../../public/html', 'cadastrar_jogo.html')));
        });
    }

    public start(porta: number) {
        this.index();
        this.register();
        app.listen(porta, () => {
            console.log('Server started in the localhost 8080');
        });
    }
}

export default Routes;