//importar módutos
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const admin = require('./routes/admin');
const usuario = require('./routes/usuario');
const path =  require('path');
const session = require('express-session');
const flash = require("connect-flash");
require("./models/Postagem");
const Postagem = mongoose.model('postagens');
require("./models/Categoria");
const Categoria = mongoose.model('categorias');
const passport = require("passport");
require('./config/auth')(passport);
const db = require("./config/db");

//configurar módulos
app.use(session({
    secret: "chavedasessao",
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize()); //passport deve ficar abaixo da seção
app.use(passport.session());
app.use(flash());
app.use((req, res, next)=>{ //middleware para configurar variaveis globais
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    res.locals.user = req.user || null; //user armazena dados so usuario autenticado, req.user criado pelo passport armazena dados do usuario logado
    //res.locals.user ? (res.locals.user).toJSON() : null
    next();
});
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', handlebars);


//configurar rotas
app.use('/admin', admin);
app.use('/usuario', usuario);

app.get('/', (req, res)=>{
    Postagem.find().populate('categoria').sort({data: "desc"}).then((postagens) => {
        res.render('index.handlebars', {postagens: postagens.map(postagens => postagens.toJSON())});
    }).catch(erro => {
        req.flash("error_msg", "Erro interno");
        res.redirect("/404");
    });
});

app.get('/404', (req, res)=>{
    app.send('erro');
});

//colcoar active e retirar active do home pe js
app.get('/postagens/:slug', (req, res)=>{
    Postagem.findOne({slug: req.params.slug}).then(postagem => {
        if(postagem){
            res.render('postagem/index.handlebars', {postagem: postagem.toJSON()});
        }else{
            req.flash("error_msg", "Postagem não existe");
            res.redirect("/");
        }
    }).catch(erro => {
        req.flash("error_msg", "Erro ao buscar postagem");
        res.redirect("/");
    });
});

app.get('/categorias', (req, res)=>{
    Categoria.find().then(categorias => {
        res.render("categorias/index.handlebars", {categorias: categorias.map(categorias => categorias.toJSON())});
    }).catch(erro => {
        req.flash('erro_msg', 'Erro ao listar categorias');
        res.redirect('/admin');
    });
});

app.get('/categorias/:slug', (req, res)=>{
    Categoria.findOne({slug: req.params.slug}).then(categoria => {
        if(categoria){
            Postagem.find({categoria: categoria._id}).then(postagens => {
                res.render("categorias/postagens.handlebars", {postagens: postagens.map(postagens => postagens.toJSON()), categoria: categoria.toJSON()});
            }).catch(erro => {
                req.flash("error_msg", "Erro ao listar posts da categoria");
                res.redirect("/categorias");
            });
        }
        else{
            req.flash("error_msg", "Categoria não existe");
            res.redirect('/categorias');
        }
    }).catch(erro => {
        req.flash('erro_msg', 'Categoria não encontrada');
        res.redirect('/categorias');
    });
});

app.use((req, res, next)=>{
    console.log('middleware');
    next();
});

//public
app.use(express.static(path.join(__dirname, "public")));

//banco
//mongoose.Promise = global.Promise;
mongoose.connect(db.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }).then(()=>{
      console.log("Mongo conectado");
  }).catch((erro)=>{
      console.log("Erro: " + erro);
  });

const PORT = process.env.PORT || 8081;
app.listen(PORT, ()=>{
    console.log("on");
});












/*
https://www.youtube.com/watch?v=dghtXs5j__Q&ab_channel=VictorLima-GuiadoProgramador

cd Desktop/hello-node/Node/9_mongoApp/
npm install nodemon -g; 
npm install express --save;
npm install express-handlebars --save;
npm install body-parser --save;
npm install mongoose --save;
npm install express-session --save;
npm install connect-flash --save;
npm install --save bcryptjs;
npm install --save passport;
npm install --save passport-local;




///mongoatlas
databaseaccess = admin admin
networkaccess = permitir acesso a qualquer ip o.o.o.o/o
url de conexão mongodb+srv://admin:<password>@cluster0.o6ozy.mongodb.net/<dbname>?retryWrites=true&w=majority
criar db.js

//git
git clone <url-do-repositorio> ou git init (e adicionar manualmente git ignore node_modules)
git add --all
git commit -m "model post"
git push origin main (como eu dei um clone remoto a main é remota e não está no meu pc)

///////deploy heroku///////
cmd> npm init -y, enter em tudo (como tem mais de um app aqui por fim didatico e pra economizar diretorio, movi esse arquivo pra pasta raiz e dicionei isso: "start": "cd Node/9_mongoApp && node app.js")
npm start no package.json, start: "node app.js"
process.env.PORT || portaDefaultDoPC

baixar heroku cli
cmd>
(como eu vou linkar no github o processo muda um pouco, isso é pra git e heroku só)
cd ..pasta projeto
heroku login
heroku create
copiar a url heroku git remote no site/deploy
git push heroku master 
heroku open

//github no heroku:
criei novo app no site e linkei github, habilitei deploy automatico
subi a aplicação no github

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



Resumo
nmp - gerenciador de pacotes, como o maven do java, que permite baixar as dependencias pelo pom.xml
npm install nodemon -g;  reinicia a aplicação automaticamente ao salvar, como a funcionalidade do spring boot do java
npm install express --save; framework para aplicações web, mais ou menos como o tomcat e mvc do java <- n tenho ctz
npm install express-handlebars --save; template engine/language equivalente ao thymeleaf do java
npm install body-parser --save; middleware que converte o corpo da pagina para outros formatos como json e.e mais ou menos
npm install mongoose --save; mongoose é um ODM, mapeia documentos, equivalente ao hibernate do java
npm install express-session --save;
npm install connect-flash --save; mostra mensagens na pagina, erros e sucessos
npm install --save bcrypyjs; gerar hash para senhas
npm install --save passport; autenticação
npm install --save passport-local;estratégia escolhida para autenticar

operações bloqueantes:
operações js sincronas ou operações nao js(I/O)?, cuidado com loops e outros
https://nodejs.org/pt-br/docs/guides/blocking-vs-non-blocking/

encriptar vs hashear senhas--------------------------------
escriptar, chave, da pra descobrir a senha
hash, codifica mensagem, nao da pra descobrir

passport middleare de autenticação



pra depois:
>fazer um painel onde o admin da ou retira direitos de outro usuarios
>quando registrar logar tbm
>so adms podem registrar categorias
if admin header mostra botão criar postagem ou redirect rota do admin
*/
