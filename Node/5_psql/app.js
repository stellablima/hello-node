//npm install sequelize --save
//npm install mysql2 --save
//npm install pg --save

//criar tabela através do node

//Sequelize - ORM - SISTEMA QUE ABSTRAI CAMADA D BANCO D DADOS
const Sequelize = require('sequelize');
//const sequelize = new Sequelize('test', 'admin', 'admin', {host:"localhost", dialect: 'mysql'})
const sequelize = new Sequelize('test', 'postgres', 'admin', {host:"localhost", dialect: 'postgres'})

sequelize.authenticate().then(function(){console.log("sucesso")}).catch(function(erro){console.log("erro" + erro)});

const Postagem = sequelize.define('postagens',{
    titulo:{
        type: Sequelize.STRING
    },
    conteudo:{
        type: Sequelize.TEXT
    }
})
//Postagem.sync({force:true});

//mysql -h localhost -u root -p
//id creatat updateat

const Usuario = sequelize.define('usuarios',{
    nome:{
        type: Sequelize.STRING
    },
    sobrenome:{
        type: Sequelize.STRING
    },
    idade: {
        type: Sequelize.INTEGER
    },
    email:{
        type: Sequelize.STRING
    }
})
//Usuario.sync({force:true});
/*
Postagem.create({
    titulo:"Coelinhos",
    conteudo:"São fofos e fazem muito cocô"
});

Usuario.create({
    nome:"Stella",
    sobrenome:"Blima",
    idade:23,
    email:"email@email.com"
});*/



