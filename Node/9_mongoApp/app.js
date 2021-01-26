//importar módutos
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const admin = require('./routes/admin');
const path =  require('path');

//configurar módulos
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', handlebars);

//configurar rotas
app.use('/admin', admin);

//public
app.use(express.static(path.join(__dirname, "public")));

//banco
//mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/blogapp").then(()=>{
    console.log("mongo on");
}).catch((erro)=>{
    console.log("Erro: "+erro);
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

*/