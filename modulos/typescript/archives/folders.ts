const fs = require('fs');
const path = require('path');

class Folder {
    private readonly path: string;

    public constructor(path: string) {
        this.path = path.replace(/ /g, '-'); // Substitui todos os espaços
    }

    public verify(): boolean {
        return fs.existsSync(this.path) && fs.statSync(this.path).isDirectory();
    }

    public getFolder(): string {
        return this.path
    }

    public delete(): void {
        fs.rmSync(this.path, { recursive: true, force: true });
    }

    public createFolder():boolean{
        if(!this.verify()){
            fs.mkdirSync(this.path, { recursive: true });
            return true
        }
        else{
            return false
        }
    }

}
export default Folder;