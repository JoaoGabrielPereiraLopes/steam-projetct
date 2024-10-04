var http = require('http');
var fs = require('fs');
var url = require('url');
const sqlite3 = require('sqlite3').verbose();

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var nomearquivo = q.pathname;

  if (nomearquivo == "/principal"||nomearquivo == "/cadastrar_jogo") {
    fs.readFile(`../htmls${nomearquivo}.html`, function (err, data) {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        return res.end("404 Arquivo não encontrado!");
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      return res.end();
    });
  }
  else if(nomearquivo == "/"){
    fs.readFile(`../htmls/principal.html`, function (err, data) {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        return res.end("404 Arquivo não encontrado!");
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      return res.end();
    });
  }
  else if (nomearquivo == "./registra") {
    let valor = q.query.nome;
    let nome = q.query.email;
    let tag = q.query.senha;
    let idade_minima = q.query.idade_minima;
    
    let db = new sqlite3.Database('../bd/steam.db', (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Conectou com o banco de dados!');
    });

    db.run(`INSERT INTO jogo(valor, nome, tag, idade_minima) VALUES(?,?,?,?)`, [valor, nome, tag, idade_minima], function (err) {
      if (err) {
        return console.log(err.message);
      }
      console.log(`Registro feito com sucesso no id ${this.lastID}`);
      
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write("<p>Registro efetuado com sucesso!<p>");
      res.write("<p><a href='./'> Voltar </a></p>");
      res.end(); // Encerrar a resposta aqui, após o registro.
      
      db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Fechou a conexão com o banco de dados!');
      });
    });
  }
  else if (nomearquivo == "./ver_jogos") {
    let db = new sqlite3.Database('./db/banco.db', (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Conectou com o banco de dados!');
    });

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write("<html><head><meta charset='UTF-8'></head><body>");
    res.write("<p>Jogos listados abaixo!</p>");

    db.all(`SELECT * FROM jogo`, [], (err, rows) => {
      if (err) {
        throw err;
      }

      res.write("<table>");
      res.write("<tr><th>Valor</th><th>Nome</th><th>Tag</th><th>Idade Mínima</th></tr>");
      
      rows.forEach((row) => {
        console.log(row.valor + " " + row.nome + " " + row.tag + " " + row.idade_minima + " ");
        res.write("<tr>");
        res.write("<td>" + row.valor + "</td>");
        res.write("<td>" + row.nome + "</td>");
        res.write("<td>" + row.tag + "</td>");
        res.write("<td>" + row.idade_minima + "</td>");
        res.write("</tr>");
      });

      res.write("</table>");
      res.write("<p><a href='./'> Voltar </a></p>");
      res.write("</body></html>");
      res.end(); // Encerrar a resposta aqui.

      // Fechar o banco de dados após o término da consulta
      db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Fechou a conexão com o banco de dados!');
      });
    });
  }
}).listen(8080, () => {
  console.log("O servidor foi iniciado na porta 8080");
});