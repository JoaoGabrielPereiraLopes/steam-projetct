var processamento=require('./processamento.js')
const sqlite3 = require('sqlite3').verbose();

function abre_jogo(){
  let db = new sqlite3.Database('../bd/steam.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Conectou com o banco de dados!');
  });
  return db
}

function escreve_banco(row,res){
  res.write("<tr>");
  res.write("<td>"+row.Valor+"</td>");
  res.write("<td>"+row.Nome+"</td>");
  res.write("<td>"+row.Tag+"</td>");
  res.write("<td>"+row.idade_minima+"</td>");
  res.write("</tr>");
}

function cabeçalho(res){
  res.write("<table border='1'>");
  res.write("<tr>");
  res.write("<th>Valor</th>");
  res.write("<th>Nome</th>");
  res.write("<th>Tag</th>");
  res.write("<th>idade_minima</th>")
  res.write("</tr>");
}

function pega_jogo(res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("<html><head><meta charset='UTF-8'><title>Usuários</title></head><body>");
  res.write("<h1>Usuários Cadastrados</h1>");

  let db = abre_jogo()
  db.all(`SELECT * FROM jogo`, [], (err, rows) => {
  if (err) {
    return console.error(err.message);
  }
  cabeçalho(res)
  rows.forEach((row) => {
  escreve_banco(row,res)
  });
  res.write("</table>");
  res.write("<p><a href='/'>Voltar</a></p>");
  res.write("</body></html>");
  return res.end();
  });

  fechadb(db)
}
function checa_numero(n){
  return n>=0
}

function fechadb(db){
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Fechou a conexão com o banco de dados!');
  });
}
function registrador_jogo(q,res){
  let nome = q.query.nome; // Certifique-se de que o nome está sendo enviado pelo formulário
  let valor = q.query.valor;
  let tag = q.query.tag;
  let idade_minima=q.query.idade_minima
  // insere um registro no banco de dados
  if (checa_numero(valor)&&checa_numero(idade_minima)){
    console.log(checa_numero(valor)&&checa_numero(idade_minima),checa_numero(idade_minima),checa_numero(valor))
    db=abre_jogo()
    db.run(`INSERT INTO jogo(Nome, Valor, Tag, idade_minima) VALUES(?,?,?,?)`, [nome, valor, tag, idade_minima], function(err) {
      if (err) {
        return console.log(err.message);
      }
      console.log(`Registro feito com sucesso no id ${this.lastID}`);
      processamento.geral(res)
      fechadb(db)
    })
  }
  else{
    processamento.geral(res,'../htmls/cadastrar_jogo.html')
  }
};
module.exports = {
    pega_jogo: pega_jogo,
    registrador_jogo: registrador_jogo,
};