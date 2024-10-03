var http = require('http');
var fs = require('fs');
var url = require('url');
const sqlite3 = require('sqlite3').verbose();
http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var nomearquivo = "." + q.pathname;
  if (nomearquivo == "./") {
    fs.readFile("../htmls/principal.html", function (err, data) {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        return res.end("404 Arquivo não encontrado!");
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      return res.end();
    });
  }
  else if (nomearquivo == "../htmls/principal.html") {
    fs.readFile(nomearquivo, function (err, data) {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        return res.end("404 Arquivo não encontrado!");
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      return res.end();
    });
  }
  else if (nomearquivo == "../htmls/cadastrar_jogo.html") {
    let valor = q.query.nome;
    let nome = q.query.email;
    let tag = q.query.senha;
    let idade_minima = q.query.idade_minima;
    let db = new sqlite3.Database('./db/banco.db', (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Conectou com o banco de dados!');
    });

    // insere um registro no banco de dados
    db.run(`INSERT INTO jogo(valor, nome, tag, idade_minima) VALUES(?,?,?,?)`, [valor, nome, tag, idade_minima], function (err) {
      if (err) {
        return console.log(err.message);
      }
      // get the last insert id
      console.log(`Registro feito com sucesso no id ${this.lastID}`);
    });

    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Fechou a conexão com o banco de dados!');
    });
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write("<p>Registro efetuado com sucesso!<p>");
    res.write("<p><a href='./'> Voltar </a></p>")
    return res.end();
  }
  else if (nomearquivo == "./ver_jogos") {
    let db = new sqlite3.Database('./db/banco.db', (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Conectou com o banco de dados!');
    });
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write("<html><head><meta charset='UTF-8'></head><body>")
    res.write("<p>Usuários listados abaixo!<p>");

    db.all(`SELECT * FROM jogo`, [], (err, rows) => {
      if (err) {
        throw err;
      }
      res.write("<table>");
      res.write("<tr>");
      res.write("<th>Valor</th>");
      res.write("<th>Nome</th>");
      res.write("<th>Tag</th>");
      res.write("<th>idade_minima</th>");

      res.write("</tr>");
      rows.forEach((row) => {
        console.log(row.valor, + " " + row.nome + " " + row.tag + " " + row.idade_minima + " ");
        res.write("<tr>");
        res.write("<td>" + row.valor + "</td>");
        res.write("<td>" + row.nome + "</td>");
        res.write("<td>" + row.tag + "</td>");
        res.write("<td>" + row.idade_minima + "</td>");


      });
      res.write("<table>");

      res.write("<p><a href='./'> Voltar </a></p>")
      res.write("</body></html>")
      return res.end();
    });
    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Fechou a conexão com o banco de dados!');
    });



  }
}).listen(8080, () => {
  console.log("O servidor foi iniciado na porta 8080");
});


