"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const path = require('path');
class Diretorio {
    caminho;
    constructor(caminho) {
        this.caminho = caminho;
        console.log('criou');
    }
    // Verifica se o diretório existe
    verifica() {
        return fs.existsSync(this.caminho) && fs.statSync(this.caminho).isDirectory();
    }
    // Retorna path para o diretório
    getPasta() {
        return this.caminho;
    }
    // Remove o diretório
    delete() {
        fs.rmSync(this.caminho, { recursive: true, force: true });
    }
    criarPasta() {
        if (!this.verifica()) {
            fs.mkdirSync(this.caminho, { recursive: true });
            return true;
        }
        else {
            return false;
        }
    }
}
exports.default = Diretorio;
