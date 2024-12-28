const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const express = require('express');
const bodyParser=require('body-parser');
const app = express();
const diretorios=require('./modulos/scripts/arquivos/diretorios.js').default
const imagem=require('./modulos/scripts/arquivos/imagens.js').default

app.use(express.static('public', { extensions: ['html'] }));
app.use(express.json());
app.use(bodyParser.json({ limit: '512mb' }));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public','principal.html' ));
});
app.get('/cadastrar_jogo.html', (req, res) => {
  console.log('legal')
  res.sendFile(path.join(__dirname, 'public','cadastrar_jogo.html' ));
})
app.post('/registra-jogo',(req,res)=>{
  const {idade, nome, valor, tag,descricao,foto} = req.body;
  erro=''
  if(idade && nome && valor && tag !=='' && descricao!==''){ 
    let local=new diretorios(`./uploads/${nome}`)
    local.criarPasta()
    let upload=new imagem('main',foto,local.getPasta())
    upload.upload()
    let db=new sqlite3.Database('./bd/steam.db',(err)=>{
      if(err){
        return console.error(err.message)
      }
      console.log('conexão bem sucedida')
    })
    db.run('INSERT INTO jogo (Valor,Nome,Tag,idade_minima,Descricao) Values(?,?,?,?,?)',[valor,nome,tag,idade,descricao],(error2)=>{
      if(error2){
        console.log(error2)
      }
      else{
        db.close((err)=>{
          if(err){
            return console.error(err.message)
          }
          console.log('fechou a conexão com o banco de dados')
        })
        return res.status(200).json({
          status: 'sucess',
          message: 'registro feito com sucesso',
          campos: req.body
        });
      }
    })
  }
  else{
    erro += 'Por favor, preencha todos os campos corretamente!<br>';
  }
  if(erro){
    res.status(200).json({
        status: 'failed',
        message: erro,
    });
  }
})
app.listen(8080, () => {
  console.log('Servidor iniciado na porta 8080');
});