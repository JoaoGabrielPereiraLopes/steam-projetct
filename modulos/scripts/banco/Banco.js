"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gerenciador = require('sqlite3').verbose();
class banco {
    banco; //esse é o banco mas não sei qual o tipo exato
    constructor(path) {
        this.banco = new gerenciador.Database(path, (err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('conexão bem sucedida');
        });
    }
    insert(query) {
        let sucesso = true;
        this.banco.run(query, (error) => {
            if (error) {
                console.error(`a query ${query} de o erro: ${error}`);
                sucesso = true;
            }
            else {
                console.log('deu tudo certo executamos a query: ', query);
                sucesso = false;
            }
        });
        return sucesso;
    }
    select(query) {
        return new Promise((resolve, reject) => {
            this.banco.get(query, (error, result) => {
                if (error) {
                    console.error(`A query "${query}" gerou o erro: ${error.message}`);
                    reject(error); // Rejeita a Promise em caso de erro
                }
                else {
                    resolve(result); // Resolve a Promise com o resultado da query
                }
            });
        });
    }
    async existe(tabela, colum, value) {
        let query = `SELECT * FROM ${tabela} WHERE ${colum} = ${value};`;
        const result = await this.select(query);
        if (result) {
            return true;
        }
        ;
        return false;
    }
}
exports.default = banco;
