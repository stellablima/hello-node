////cmd
//cd HelloWorld
//npm install express --save 

//const pra variável nunca ser sobrescrita
//importa express
const express = require("express");
//instancia
const app = express();
//... code here


//definir rota da aplicação
app.get("/", function(req, res){
    res.send("BV!")
});

app.get("/sobre", function(req, res){
    res.send("BV! Isso é um blog")
});

app.get("/blog", function(req, res){
    res.send("BV! ao meu blog")
});


//app.listen(8081);
app.listen(8081, function(){
    //função de callback é executada sempre que uma ação acontece
    console.log("Servidor rodando na porta 8081");
});