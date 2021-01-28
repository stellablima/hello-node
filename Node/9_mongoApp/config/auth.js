const localStrategy = require('passport-local').Strategy;
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

//Model de usuário
require("../models/Usuario");
const Usuario =  mongoose.model("usuarios");

//chave do sistema é o email, poderia ser sur username
module.exports = passport => {
                                                              //se o campo se chama-se password funfaria
    passport.use(new localStrategy({usernameField: 'email', passwordField: 'senha'}, (email, senha, done) => {
        Usuario.findOne({email: email}).then(usuario => {
            if(!usuario){
                return done(null, false, {message: "Essa conta não existe"});
            }

            bcrypt.compare(senha, usuario.senha, (erro, batem) => {
                if(batem) return done(null, usuario);
                else return done(null, false, {message: "Senha incorreta"})
            })
        })
    }));

passport.serializeUser((usuario, done) => {
    done(null, usuario.id);
});
passport.deserializeUser((id, done) => {
    Usuario.findById(id, (err, usuario) => {
        done(err, usuario);
    });
});

}