"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const path = require('path');
class Folder {
    path;
    constructor(path) {
        this.path = path.replace(/ /g, '-'); // Substitui todos os espaços
    }
    verify() {
        return fs.existsSync(this.path) && fs.statSync(this.path).isDirectory();
    }
    getFolder() {
        return this.path;
    }
    delete() {
        fs.rmSync(this.path, { recursive: true, force: true });
    }
    createFolder() {
        if (!this.verify()) {
            fs.mkdirSync(this.path, { recursive: true });
            return true;
        }
        else {
            return false;
        }
    }
}
exports.default = Folder;
