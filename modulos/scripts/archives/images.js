"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Archives = require('./archives').default;
class Images extends Archives {
    constructor(name, content = '', path) {
        super(`${name}.png`, content, path);
        const contentwithoutPrefix = content.split(",")[1];
        this.content = Buffer.from(contentwithoutPrefix, 'base64');
    }
    toBase64() {
        const prefix = 'data:image/png;base64,';
        return prefix + this.content.toString('base64');
    }
}
exports.default = Images;
