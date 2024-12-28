const fs = require('fs');
const path = require('path');
class Arquivos {
    protected conteudo: any;
    protected readonly nomeArquivo: string;
    protected readonly diretorio: string;

    protected constructor(nome: string, conteudo: string = '', diretorio: string) {
        this.conteudo = conteudo;
        this.nomeArquivo = nome;
        this.diretorio = diretorio;
    }

    protected async upload(): Promise<boolean> {
        try {
            const caminhoCompleto = path.join(this.diretorio, this.nomeArquivo);
            // Garantir que o diretório exista
            if (!fs.existsSync(this.diretorio)) {
                fs.mkdirSync(this.diretorio, { recursive: true });
            }

            // Escrever o arquivo
            await fs.promises.writeFile(caminhoCompleto, this.conteudo);
            console.log(`Upload bem-sucedido em ${caminhoCompleto}`);
            return true;
        } catch (err) {
            console.error('Erro ao salvar o arquivo:', err);
            return false;
        }
    }

    protected async download(): Promise<string> {
        try {
            const caminhoCompleto = path.join(this.diretorio, this.nomeArquivo);
            const conteudo = await fs.promises.readFile(caminhoCompleto, 'utf8');
            return conteudo;
        } catch (err) {
            console.error('Erro ao ler o arquivo:', err);
            return '';
        }
    }

    protected async delete(): Promise<boolean> {
        try {
            const caminhoCompleto = path.join(this.diretorio, this.nomeArquivo);
            await fs.promises.unlink(caminhoCompleto);
            console.log('Arquivo deletado com sucesso');
            return true;
        } catch (err) {
            console.error('Erro ao deletar o arquivo:', err);
            return false;
        }
    }
}
export default Arquivos;