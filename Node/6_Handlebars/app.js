///npm install nodemon -g
//npm install express --save 
//npm install express-handlebars --save
//npm install sequelize --save
//npm install pg --save
//npm install body-parser --save
//nodemon app.js


//rotas html servidor local
const express = require("express");
const app = express();

//banco
const Sequelize = require('sequelize');
const sequelize = new Sequelize('postapp', 'postgres', 'admin', {host: "localhost", dialect: 'postgres'})
sequelize.authenticate().then(function(){console.log("sucesso")}).catch(function(erro){console.log("erro" + erro)});

//bodyparser
const bodyParser =  require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

//template engine https://www.youtube.com/watch?v=U4OUBjnjBWU&list=PLJ_KhUnlXUPtbtLwaxxUxHqvcNQndmI4B&index=19&ab_channel=VictorLima-GuiadoProgramador
const handlebars = require("express-handlebars");
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');




//rotas
app.get('/cad', function(req, res){
    //res.send('rota de cadastro de posts');
    res.render('formulario');
});

app.post('/add', function(req, res){
    res.send(req.body);
});




app.listen(8081, function(){console.log("servidor http://localhost:8081");});

//utilitario para receber dados de qualquer formulario -> bodyparser


//git clone
//upar essa pasta
