//importar módutos
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const admin = require('./routes/admin');
const path =  require('path');
const session = require('express-session');
const flash = require("connect-flash");

//configurar módulos
app.use(session({
    secret: "chavedasessao",
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash("success_msg");//variaveis globais
    res.locals.error_msg = req.flash("error_msg");
    next();
});
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', handlebars);


//configurar rotas
app.use('/admin', admin);

app.use((req, res, next)=>{
    console.log('middleware');
    next();
});

//public
app.use(express.static(path.join(__dirname, "public")));

//banco
//mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/blogapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(()=>{
      console.log("Mongo conectado");
  }).catch((erro)=>{
      console.log("Erro: " + erro);
  });



const PORT = 8081;
app.listen(PORT, ()=>{
    console.log("on");
});












/*https://www.youtube.com/watch?v=dghtXs5j__Q&ab_channel=VictorLima-GuiadoProgramador

cd Desktop/hello-node/Node/9_mongoApp/
npm install nodemon -g; 
npm install express --save;
npm install express-handlebars --save;
npm install body-parser --save;
npm install mongoose --save;
npm install express-session --save;
npm install connect-flash --save;
*/

/*
git clone <url-do-repositorio>
git add --all
git commit -m "model post"
git push origin main
*/

//show databases
//use novoBanco
//show collections
//db.nomeDaColeção.find()

/*
Utilizar bootstrap para integrar arquivos estaticos como 
img, css, jquery as páginas


modulo padrão do node, manipular arquivos e diretorios
const path =  require('path');

//public - as pastas que estão guardando todos os arquivos estaticos é a public
app.use(express.static(path.join(__dirname, "public")));


{{>_navbar}}
sinal de maior sinaliza partials

slug, é a url do objeto

cookie arquivo txt com id x sessão puxa o id e joga os dados no navegador
middleware, uma entidade que pode manipular os dados das requisições http

app.use configura e instancia middlewares

flash tipo de sessão que aparece enquanto a pag ta on, usamos para mensagens globais
*/