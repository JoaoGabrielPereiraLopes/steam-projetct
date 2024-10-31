var http = require('http');
var url = require('url');
var processamento=require('./processamento.js')
var banco=require('./banco.js')

http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var nomearquivo = "../htmls" + q.pathname;
    if(nomearquivo == "../htmls/"){
      processamento.geral(res)
    }
    else if(nomearquivo == "../htmls/principal.html" || nomearquivo == "../htmls/cadastrar_jogo.html"){
      processamento.geral(res,nomearquivo)
    }
    else if(nomearquivo == "../htmls/registra"){
      banco.registrador_jogo(q,res)
      return res.end
    }
    else if(nomearquivo == "../htmls/ver_jogos"){
      banco.pega_jogo(res)      
    }
    else if (nomearquivo.endsWith('.jpeg')) {
      processamento.retorno_imagem(res,q.pathname)
    }
    else if (nomearquivo.endsWith('.css')) {
      processamento.css(res,q.pathname)
    }
    else if (nomearquivo.endsWith('.woff')) {
      processamento.woff(res,q.pathname)
    }
    else if (nomearquivo.endsWith('.ttf')) {
      processamento.ttf(res,q.pathname)
    }
    else if (nomearquivo.endsWith('.js')) {
      processamento.JS(res,q.pathname)
    }
}).listen(8080, () => {
    console.log("O servidor foi iniciado na porta 8080");
});
