const express = require("express");
const app = express();


app.get("/ola/:nome/:sobrenome", function(req, res){
    res.send("<h1>Olá "+req.params.nome+"</h1>");
});




app.listen(8081, function(){
       console.log("Servidor rodando na porta 8081");
});