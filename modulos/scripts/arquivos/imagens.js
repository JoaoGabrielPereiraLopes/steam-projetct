"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path');
const fs = require('fs');
const Arquivos = require('./arquivos').default;
class Images extends Arquivos {
    constructor(nome, conteudo = '', path) {
        // Sempre força a extensão para .png
        super(`${nome}.png`, conteudo, path); // Passando o conteúdo corretamente
        // Remove o prefixo Base64 e converte para Buffer
        const conteudoSemPrefixo = conteudo.split(",")[1];
        console.log(conteudoSemPrefixo);
        this.conteudo = Buffer.from(conteudoSemPrefixo, 'base64');
    }
    // Método opcional para retornar o conteúdo Base64 forçando o prefixo de PNG
    toBase64() {
        const prefixo = 'data:image/png;base64,';
        return prefixo + this.conteudo.toString('base64');
    }
}
exports.default = Images;
