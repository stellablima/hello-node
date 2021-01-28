const { RSA_NO_PADDING, EFAULT } = require('constants');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/Usuario');
const Usuario = mongoose.model("usuarios");
const bcrypt = require('bcryptjs');
const passport = require('passport');

router.get('/registro', (req, res) => {
    res.render("usuario/registro.handlebars");
});

//repor os campos exceto o errado r: Tu pode salvar os dados em sessão, vamos falar sobre isso em uma aula no curso.
router.post('/registro', (req, res)=>{
    var erros = [];
    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome inválido"});
    }
    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
        erros.push({texto: "Email inválido"});
    }
    if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
        erros.push({texto: "Senha inválido"});
    }
    if(req.body.senha.length < 4){
        erros.push({texto: "Senha deve ter 4 digitos ou mais"});
    }
    if(req.body.senha != req.body.senha2){
        erros.push({texto: "Senhas diferentes"});
    }
    if(erros.length > 0){
        res.render("usuario/registro.handlebars", {erros: erros});
    }else{

        Usuario.findOne({email: req.body.email}).then(usuario => {
            if(usuario){
                req.flash("error_msg", "Já existe uma conta com esse e-mail, tente outro");
                res.redirect("/usuario/registro");
            }else{

                const novoUsuario = new Usuario({
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: req.body.senha
                });

                bcrypt.genSalt(10, (erro, salt) => {
                    bcrypt.hash(novoUsuario.senha, salt, (erro, hash) => {
                        if(erro){
                            req.flash("error_msg", "Erro ao gerar hash de senha");
                            res.redirect('/');
                        }else{
                            novoUsuario.senha = hash;

                            novoUsuario.save().then(() => {
                                req.flash("success_msg", "Cadastrado com sucesso");
                                res.redirect('/');///usuario/homepage
                            }).catch(erro => {
                                req.flash("error_msg", "Erro ao salvar");
                                res.redirect('/usuario/registro');
                            });
                        }
                    });
                });
            }
        }).catch(erro => {
            req.flash("error_msg", "Erro ao buscar usuario para verificação de duplicidade, não foi possível criar conta");
            res.redirect("/");
        });
    }
});

router.get('/login', (req, res) =>{
    res.render("usuario/login.handlebars");
});

router.post('/login', (req, res, next) =>{ //rota de autenticação
   passport.authenticate("local", {
       successRedirect: "/",
       failureRedirect: "/usuario/login",
       failureFlash: true
   })(req, res, next);

});

module.exports = router;



