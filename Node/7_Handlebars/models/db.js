const Sequelize = require('sequelize');
const sequelize = new Sequelize('postapp', 'postgres', 'admin', {host: "localhost", dialect: 'postgres'})
sequelize.authenticate().then(function(){console.log("sucesso")}).catch(function(erro){console.log("erro" + erro)});


module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}
/*
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
})*/
//Usuario.sync({force:true});
/* para testar
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
