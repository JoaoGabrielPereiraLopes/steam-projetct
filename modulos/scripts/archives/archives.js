"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const path = require('path');
const folders = require('./folders').default;
class Archive {
    content;
    archiveName;
    folder;
    constructor(name, content = '', folder) {
        this.content = content;
        this.archiveName = name;
        this.folder = folder;
        console.log(folders);
    }
    async upload() {
        try {
            let dir = new folders(this.folder);
            dir.createFolder();
            const completePath = path.join(this.folder, this.archiveName);
            await fs.promises.writeFile(completePath, this.content);
            console.log(`Upload successful in ${completePath}`);
            return true;
        }
        catch (err) {
            console.error(`Error to upload your archive in ${this.folder}: ${err}`);
            return false;
        }
    }
    async download() {
        this.content = '';
        try {
            const completePath = path.join(this.folder, this.archiveName);
            this.content = await fs.readFile(completePath, 'utf8');
        }
        catch (err) {
            console.error('Error to read the archive:', err);
            this.content = '';
        }
        return this.content;
    }
    async delete() {
        try {
            const completePath = path.join(this.folder, this.archiveName);
            await fs.promises.unlink(completePath);
            console.log('Archive deleted with sucefull');
            return true;
        }
        catch (err) {
            console.error('eError to delete the archive: ', err);
            return false;
        }
    }
}
exports.default = Archive;
