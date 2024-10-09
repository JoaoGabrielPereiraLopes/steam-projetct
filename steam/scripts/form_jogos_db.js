var http = require('http');
var fs = require('fs');
var url = require('url');
const sqlite3 = require('sqlite3').verbose();

function serveFile(res, filePath, contentType) {
  fs.readFile(filePath, (err, content) => {
      if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Erro ao carregar o arquivo.');
      } else {
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(content, 'utf-8');
      }
  });
}
function retorno_imagem(res,nomearquivo){
  serveFile(res,`../logo/${nomearquivo}`,'image/jpeg',function (err, data){
    return data
  });
}
function css(res,nomearquivo){
  serveFile(res,`../htmls/${nomearquivo}`,'text/css',function (err, data){
    if(err){
      console.log(err)
    }
    return data
  });
}
function geral(nomearquivo='../htmls/principal.html'){
  fs.readFile(nomearquivo, function(err, data) {
    if(err){
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("404 Arquivo não encontrado!");
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}
function abre_jogo(){
  let nome = q.query.nome; // Certifique-se de que o nome está sendo enviado pelo formulário
      let valor = q.query.valor;
      let tag = q.query.tag;
      let idade_minima=q.query.idade_minima

      let db = new sqlite3.Database('../bd/steam.db', (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Conectou com o banco de dados!');
      });
      return db
}
function fechadb(db=abre_jogo()){
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Fechou a conexão com o banco de dados!');
  });
}
function registrador_jogo(db=abre_jogo()){}

      // insere um registro no banco de dados
      db.run(`INSERT INTO jogo(Nome, Valor, Tag, idade_minima) VALUES(?,?,?,?)`, [nome, valor, tag, idade_minima], function(err) {
        if (err) {
          return console.log(err.message);
        }
        console.log(`Registro feito com sucesso no id ${this.lastID}`);
        fs.readFile(`../htmls/principal.html`, function (err, data) {
          if(err){
              console.log(err)
              res.writeHead(404, {'Content-Type': 'text/html'});
              return res.end("404 Arquivo não encontrado!");
          }
          
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.write(data);
          return res.end();
        });
        fechadb()
});
http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var nomearquivo = "../htmls" + q.pathname;
    if(nomearquivo == "../htmls/"){
      geral()
    }
    else if(nomearquivo == "../htmls/principal.html" || nomearquivo == "../htmls/cadastrar_jogo.html"){
      geral(nomearquivo)
    }
    else if(nomearquivo == "../htmls/registra"){
      
    }
    else if(nomearquivo == "../htmls/ver_jogos"){
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write("<html><head><meta charset='UTF-8'><title>Usuários</title></head><body>");
      res.write("<h1>Usuários Cadastrados</h1>");

      let db = new sqlite3.Database('../bd/steam.db', (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Conectou com o banco de dados!');
      });

       db.all(`SELECT * FROM jogo`, [], (err, rows) => {
        if (err) {
          return console.error(err.message);
        }

        res.write("<table border='1'>");
        res.write("<tr>");
        res.write("<th>Valor</th>");
        res.write("<th>Nome</th>");
        res.write("<th>Tag</th>");
        res.write("<th>idade_minima</th>")
        res.write("</tr>");
        rows.forEach((row) => {
          res.write("<tr>");
          res.write("<td>"+row.Valor+"</td>");
          res.write("<td>"+row.Nome+"</td>");
          res.write("<td>"+row.Tag+"</td>");
          res.write("<td>"+row.idade_minima+"</td>");
          res.write("</tr>");
        });
        res.write("</table>");
        res.write("<p><a href='/'>Voltar</a></p>");
        res.write("</body></html>");
        return res.end();
      });

      db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Fechou a conexão com o banco de dados!');
      });
    }
    else if (nomearquivo.endsWith('.jpeg')) {
      retorno_imagem(res,q.pathname)
    }
    else if (nomearquivo.endsWith('.css')) {
      css(res,q.pathname)
    }

}).listen(8080, () => {
    console.log("O servidor foi iniciado na porta 8080");
});
