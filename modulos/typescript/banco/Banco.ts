const gerenciador=require('sqlite3').verbose()

class banco{
    private banco:any //esse é o banco mas não sei qual o tipo exato
    protected constructor(path:string){
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
                console.error(`a query ${query} de o erro: ${error}`)
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
                    reject(error); // Rejeita a Promise em caso de erro
                } else {
                    resolve(result); // Resolve a Promise com o resultado da query
                }
            });
        });
    }
    
    
    public async existe(tabela:string,colum: string, value: any): Promise<boolean> {
        let query = `SELECT * FROM ${tabela} WHERE ${colum} = ${value};`;
        const result = await this.select(query);
        if (result){
            return true
        };
        return false
    }

}

export default banco;