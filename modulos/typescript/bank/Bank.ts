import { Database } from 'sqlite3';
const gerenciador=require('sqlite3').verbose()

class banco{
    private banco:Database;
    
    public constructor(path:string){
        this.banco=new gerenciador.Database(path,(err:Error)=>{
            if(err){
              return console.error(err.message)
            }
            console.log('conexão bem sucedida')
        })
    }

    public insert(query:string):boolean{
        let sucesso=true
        this.banco.run(query,(error:Error)=>{
            if(error){
                console.error(`a query ${query} deu o erro: ${error}`)
                sucesso=true
            }
            else{
                console.log('deu tudo certo executamos a query: ',query)
                sucesso=false
            }
        })
        return sucesso
    }

    public select(query: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.banco.get(query, (error: Error, result: any) => {
                if (error) {
                    console.error(`A query "${query}" gerou o erro: ${error.message}`);
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }
    
    
    public async exist(table:string,column: string, value: any): Promise<boolean> {
        let query = `SELECT * FROM ${table} WHERE ${column} = ${value};`;
        const result = await this.select(query);
        if (result){
            return true
        };
        return false
    }
}

export default banco;