//modulo nativo do node, aplicações web backend
var http = require('http');

//criar servidor
http.createServer(function(req, res){
    res.end("online");
}).listen(8081);

console.log("on");

//framework minimalistas, poucos recursos, simples, workflow rápido

//framework fullstack , muitos recursos, robusto, workflow mais lento


//npm maior repositório de pacotes do mundo
//cd pastaDoProjeto
//npm -v
//npm install express --save 
//save (salva os arquivos do modulo dentro do projeto)

//package-lock.json, arquivo de configuração do npm
