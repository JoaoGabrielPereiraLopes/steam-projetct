"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gerenciador = require('sqlite3').verbose();
class banco {
    banco;
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
                console.error(`a query ${query} deu o erro: ${error}`);
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
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    async exist(table, column, value) {
        let query = `SELECT * FROM ${table} WHERE ${column} = ${value};`;
        const result = await this.select(query);
        if (result) {
            return true;
        }
        ;
        return false;
    }
}
exports.default = banco;
