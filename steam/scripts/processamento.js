var fs = require('fs');

function serveFile(res, filePath, contentType) {
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Erro ao carregar o arquivo.');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }   
    })
}
  
function geral(res,nomearquivo='../htmls/principal.html'){
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

  module.exports = {
    geral: geral,
    retorno_imagem: retorno_imagem,
    css: css
};