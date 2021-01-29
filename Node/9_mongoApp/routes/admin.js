const express = require('express');
const router = express.Router();
//importando model
const mongoose = require('mongoose');
require("../models/Categoria")
const Categoria = mongoose.model("categorias");
require("../models/Postagem")
const Postagem = mongoose.model("postagens");
const {modo} = require("../helpers/modo");

router.get('/',(req, res)=>{
    res.render('admin/index.handlebars');
});

router.get('/posts', modo,(req, res)=>{
    res.send('posts');
});

router.get('/categorias', modo, (req, res)=>{
    Categoria.find().sort({date : 'desc'}).then((categorias)=>{
        res.render('admin/categorias.handlebars', {categorias: categorias.map(categorias => categorias.toJSON())});
    }).catch((erro)=>{
        req.flash("erro_msg", "Erro ao listar categorias");
        res.redirect("/admin");
    });
});

router.get('/categorias/add/', modo, (req, res)=>{
    res.render('admin/addcategorias.handlebars');
});
//renomear rota pra /add
router.post('/categorias/nova', modo, (req, res)=>{

    //validação manual//repor os campos exceto o errado 
    var erros = [];
    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome inválido"});
    }
    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        erros.push({texto: "Slug inválido"});
    }
    if(req.body.nome.length < 2){
        erros.push({texto: "Nome da categoria pequeno"});
    }
    if(erros.length > 0){
        res.render("admin/addcategorias.handlebars", {erros: erros});
    }else{
        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
        }
        new Categoria(novaCategoria).save().then(()=>{
            req.flash("success_msg", "Categoria criada com sucesso!");
            res.redirect("/admin/categorias");
        }).catch((erro)=>{
            req.flash('error_msg', "Erro ao salvar!");
            res.redirect('/admin');
        });
    }


});

router.get("/categorias/edit/:id", modo, (req, res)=>{
    Categoria.findOne({_id: req.params.id}).then((categoria)=>{
        res.render("admin/editcategorias.handlebars", {categoria:categoria.toJSON()});
    }).catch((erro)=>{
        req.flash("error_msg", "Categoria não encontrada");
        res.redirect("/admin/categorias");
    });
});

//melhorar pegar o edit pela url nao é melhor? utilizando param
router.post('/categorias/edit', modo, (req, res) => {
    Categoria.findOne({_id:req.body.id}).then((categoria)=>{
        categoria.nome = req.body.nome;
        categoria.slug = req.body.slug;
            //validação pendente
        categoria.save().then(()=>{
            req.flash('success_msg', 'Sucesso ao editar');
            res.redirect('/admin/categorias');
        }).catch(erro =>{
            req.flash('error_msg', 'Erro ao atualizar categoria');
            res.redirect('/admin/categorias');
        });

    }).catch(erro =>{
        req.flash("error_msg", "Categoria não encontrada");
        res.redirect('/admin/categorias');
    });
});

router.post('/categorias/delete', modo, (req, res)=>{
    Categoria.remove({_id: req.body.id}).then(()=>{
        req.flash("success_msg", "Categoria deletada");
        res.redirect('/admin/categorias');
    }).catch(erro => {
        req.flash("error_msg", "Erro ao deletar");
        res.redirect('/admin/categorias');
    });
});

router.get("/postagens", modo, (req,res)=>{
    Postagem.find().populate('categoria').sort({data: 'desc'}).then(postagens => {
        res.render("admin/postagens.handlebars", {postagens: postagens.map(postagens => postagens.toJSON())});
    }).catch(erro => {
        req.flash('erro_msg', 'Erro ao listar postagens');
        res.redirect('/admin');
    });
});

router.get("/postagens/add", modo, (req,res)=>{
    Categoria.find().then((categorias)=>{
        res.render("admin/addpostagens.handlebars", {categorias: categorias.map(categorias => categorias.toJSON())});
    }).catch(erro => {
        req.flash("error_msg", "Erro ao carregar ao buscar categorias");
        res.redirect('/admin/postagens');
    });
});

router.post("/postagens/add", modo, (req, res)=>{
//validação ?
    var erros = [];

    if(req.body.categoria == "0"){
        erros.push({texto: "Selecione ou registre uma categoria"});
    }
    if(erros.length > 0){
        res.render("admin/addpostagens.handlebars", {erros: erros});
    }else{
        const novaPostagem = {
            titulo: req.body.titulo,
            slug: req.body.slug,
            descricao: req.body.descricao,
            conteudo: req.body.conteudo,
            categoria: req.body.categoria
        }
        new Postagem(novaPostagem).save().then(()=>{
            req.flash("success_msg", "Postagem criada com sucesso!");
            res.redirect("/admin/postagens");
        }).catch((erro)=>{
            req.flash('error_msg', "Erro ao salvar!");
            res.redirect('/admin/postagens');
        });
    }
});

router.get('/postagens/edit/:id', modo, (req, res) => {
    Postagem.findOne({_id: req.params.id}).populate('categoria').then((postagem)=>{
        Categoria.find().then(categorias => {
            //pendente condição pra dropar elemento do select
            //var cond = 1;
            //if(postagem.categoria._id == )
            //{{#if postagem.categoria._id}}{{/if}}
            //forEach(categoria in categorias){}
            //categorias.array.forEach(element => {
            //    if(categoria._id == postagem.categoria._id)
            //        categorias.
            //});

            res.render("admin/editpostagens.handlebars", {categorias: categorias.map(categorias => categorias.toJSON()), postagem: postagem.toJSON()});
        }).catch(erro => {
            req.flash("erro_msg", "Erro ao listar categorias");
            res.redirect("/admin/postagens");
        });
    }).catch(erro => {
        req.flash("error_msg", "Erro ao encontrar formulário");
        res.redirect("/admin/postagens");
    });
});
//<form action="/admin/postagens/edit/{{postagem._id}}" method="POST">
//é seguro? é uma melhor pratica mandar por hidden input e pegar no body do form?
router.post('/postagens/edit/:id', modo, (req, res)=>{
    Postagem.findOne({_id:req.params.id}).then((postagem)=>{
        postagem.titulo = req.body.titulo;
        postagem.slug = req.body.slug;
        postagem.descricao = req.body.descricao;
        postagem.conteudo = req.body.conteudo;
        postagem.categoria = req.body.categoria;

        //validação pendente
        postagem.save().then(()=>{
            req.flash('success_msg', 'Sucesso ao editar');
            res.redirect('/admin/postagens');
        }).catch(erro =>{
            req.flash('error_msg', 'Erro ao atualizar categoria');
            res.redirect('/admin/postagens');
        });
    }).catch(erro =>{
        req.flash("error_msg", "Categoria não encontrada");
        res.redirect('/admin/postagens');
    });
});
//forma não segura pois é um get de botão, nao tem form no html
router.get('/postagens/delete/:id', modo, (req, res)=>{
    Postagem.deleteOne({_id: req.params.id}).then(()=>{
        req.flash("success_msg", "Postagem deletada");
        res.redirect('/admin/postagens');
    }).catch(erro => {
        req.flash("error_msg", "Erro ao deletar");
        res.redirect('/admin/postagens');
    });
});


module.exports = router;