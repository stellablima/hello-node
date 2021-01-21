//npm install nodemon -g
//-g: globalmente no sistema

//nodemon nomeProjeto

const express = require("express");
const app = express();


app.get("/", function(req, res){
    res.sendFile(__dirname+"/html/index.html");
});

app.get("/sobre", function(req, res){
    res.sendFile(__dirname+"/html/sobre.html");
});


app.listen(8081, function(){
       console.log("Servidor rodando na porta 8081");
});

//proxima aula motor de renderização html, template engine