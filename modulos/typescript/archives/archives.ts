const fs = require('fs');
const path = require('path');
const folders=require('./folders').default

class Archive {
    protected content: any;
    protected readonly archiveName: string;
    protected readonly folder: string;

    protected constructor(name: string, content: string = '', folder: string) {
        this.content = content;
        this.archiveName = name;
        this.folder = folder;
        console.log(folders)
    }

    protected async upload(): Promise<boolean> {
        try {
            let dir=new folders(this.folder)
            dir.createFolder()
            const completePath = path.join(this.folder, this.archiveName);
            await fs.promises.writeFile(completePath, this.content);
            console.log(`Upload successful in ${completePath}`);
            return true;
        } catch (err) {
            console.error(`Error to upload your archive in ${this.folder}: ${err}`);
            return false;
        }
    }
    protected async download(): Promise<string> {
        this.content=''
        try {
            const completePath = path.join(this.folder, this.archiveName);
            this.content = await fs.readFile(completePath, 'utf8');
        } catch (err) {
            console.error('Error to read the archive:', err);
            this.content=''
        }
        return this.content
    }
    protected async delete(): Promise<boolean> {
        try {
            const completePath = path.join(this.folder, this.archiveName);
            await fs.promises.unlink(completePath);
            console.log('Archive deleted with sucefull');
            return true;
        } catch (err) {
            console.error('eError to delete the archive: ', err);
            return false;
        }
    }
}
export default Archive;