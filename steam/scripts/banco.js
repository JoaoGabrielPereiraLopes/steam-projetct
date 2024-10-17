var processamento=require('./processamento.js')
const sqlite3 = require('sqlite3').verbose();

function abre_jogo(){
  let db = new sqlite3.Database('../bd/steam.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Conectou com o banco de dados!');
  });
  return db;
}

function valor(res,row){
  res.write('<div class="col-sm-3 buttonParaComprarJogo">');
  res.write('<div class="valorDoJogo">R$'+row.Valor+'</div>');
  res.write('<button type="button" class="btn btn-outline-success fs-4">Comprar</button>');
  res.write('</div>');
}

function foto(res,row){
  res.write('<div class="col-sm-1 classification">');
  res.write('<img src="classificacao-'+row.idade_minima+'-anos-logo.jpeg">');
  console.log(row.idade_minima)
  res.write('</div>');
}

function Descrição(res,row){
  res.write('<div class="col-sm-8 fs-2">Descrição <br>'+row.Descricao+'</div>');
}

function fechamento(res){
  res.write('</div>');  // Fechando "row"
  res.write('</div>');  // Fechando "accordion-body"
  res.write('</div>');  // Fechando "accordion-collapse"
  res.write('</div>');  // Fechando "accordion-item"
}

function cabeca(res,row){
  res.write('<div class="accordion-item bg-dark">');

  res.write('<h2 class="accordion-header" id="panelsStayOpen-heading'+row.Id+'">');
  res.write('<button class="accordion-button bg-dark" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse'+row.Id+'" aria-expanded="true" aria-controls="panelsStayOpen-collapse'+row.Id+'">');
  res.write('<div class="nome col-sm-9">'+row.Nome+'</div>');
  res.write('<div class="tag col-sm-3">'+row.Tag+'</div>');
  res.write('</button>');
  res.write('</h2>');

  res.write('<div id="panelsStayOpen-collapse'+row.Id+'" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-heading'+row.Id+'">');
  res.write('<div class="accordion-body py-5">');
  res.write('<div class="row">');
}

function escreve_banco(res, row) {
  cabeca(res,row)
  // Botão de comprar e valor do jogo
  valor(res,row)
  // Classificação etária
  foto(res,row)
  // Descrição
  Descrição(res,row)
  // fechamento
  fechamento(res)
}
function header(res){
  res.write("<html><head><meta charset='UTF-8'><title>Loja</title>");
  res.write('<link rel="stylesheet" href="main.css">');
  res.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">');
  res.write('<link rel="shortcut icon" href="steam_verde_binaria.jpeg" type="image/x-icon"></link>');
  res.write('<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>');
  res.write(`<style>
  body{background-color:rgb(0, 27, 14)}
  a{
    text-decoration:none;
    color: #ffffff;
  }
  nav > disable{
    color:white;
    font-size: 1.5rem;
    margin-right: 30px;
    margin-left: 30px;
}
nav > disable:hover{
    cursor: default;
}
nav > a{
    overflow: none;
    font-size: 1.5rem;
    text-decoration: none;
    margin-right: 30px;
    margin-left: 30px;
}
nav>a :hover{
    cursor: pointer;
}
  </style></head><body>`);
}
function nav(res){
  res.write('<nav> <a href="principal.html">Home</a>');
  res.write('<a href="cadastrar_jogo.html">Cadastrar</a>');
  res.write(`
    <disable>Loja</disable>
    <div id="a"><a href="principal.html">BinarySteam</a></div>
    <div class="img" id="logoprincipal">
    </div>
  </nav>`);
  res.write('</div>');
}
function conteudo(res){
  res.write('<div class="container-fluid mt-1">');
  res.write("<h1 class='text-center my-4'>LOJA</h1>");
  res.write('<div class="row">');
  res.write('<div class="col-sm-2"></div>');
  res.write('<div class="bg-success card col-sm-8">');
  res.write('<div class="accordion" id="accordionPanelsStayOpenExample">');
}
function fechamento_conteudo(res){
    res.write("</div>");  // Fechando "accordion"
    res.write("</div>");  // Fechando "col-sm-8"
    res.write("</div>");  // Fechando "row"
    res.write("</div>");  // Fechando "container-fluid"
    res.write("</body></html>");
}
function pega_jogo(res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  //escreve o header
  header(res)
  //escreve o res
  nav(res)
  //abre a div que tem o conteudo
  conteudo(res)
  let db = abre_jogo();
  db.all(`SELECT * FROM jogo`, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }

    rows.forEach((row) => {
      escreve_banco(res, row);  // Passe o "row" como argumento
    });
    // fecha o conteudo
    fechamento_conteudo(res)
    // Feche o banco fora do loop
    fechadb(db);
    return res.end();
  });
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
  let idade_minima=q.query.opcao;
  let desc = q.query.desc;
  // insere um registro no banco de dados
  if (checa_numero(valor)){
    console.log(checa_numero(valor)&&checa_numero(idade_minima),checa_numero(idade_minima),checa_numero(valor))
    db=abre_jogo()
    db.run(`INSERT INTO jogo(Nome, Valor, Tag, idade_minima, Descricao) VALUES(?,?,?,?,?)`, [nome, valor, tag, idade_minima, desc], function(err) {
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