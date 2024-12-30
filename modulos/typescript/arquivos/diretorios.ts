const fs = require('fs');
const path = require('path');

class Diretorio {
    private readonly caminho: string;

    public constructor(caminho: string) {
        this.caminho = caminho;
    }

    // Verifica se o diretório existe
    public verifica(): boolean {
        return fs.existsSync(this.caminho) && fs.statSync(this.caminho).isDirectory();
    }

    // Retorna path para o diretório
    public getPasta(): string {
        return this.caminho
    }
    // Remove o diretório
    public delete(): void {
        fs.rmSync(this.caminho, { recursive: true, force: true });
    }

    public criarPasta():boolean{
        if(!this.verifica()){
            fs.mkdirSync(this.caminho, { recursive: true });
            return true
        }
        else{
            return false
        }
    }

}
export default Diretorio;