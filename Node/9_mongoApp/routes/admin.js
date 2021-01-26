const express = require('express');
const router = express.Router();
//importando model
const mongoose = require('mongoose');
require("../models/Categoria")
const Categoria = mongoose.model("categorias");

router.get('/',(req, res)=>{
    res.render('admin/index.handlebars');
});

router.get('/posts',(req, res)=>{
    res.send('posts');
});

router.get('/categorias',(req, res)=>{
    Categoria.find().sort({date : 'desc'}).then((categorias)=>{
        res.render('admin/categorias.handlebars', {categorias: categorias.map(categorias => categorias.toJSON())});
    }).catch((erro)=>{
        req.flash("erro_msg", "Erro ao listar categorias");
        res.redirect("/admin");
    });
});

router.get('/categorias/add/', (req, res)=>{
    res.render('admin/addcategorias.handlebars');
});

router.post('/categorias/nova',(req, res)=>{

    //validação manual
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

router.get("/categorias/edit/:id",(req, res)=>{
    Categoria.findOne({_id: req.params.id}).then((categoria)=>{
        res.render("admin/editcategorias.handlebars", {categoria:categoria.toJSON()});
    }).catch((erro)=>{
        req.flash("error_msg", "Categoria não encontrada");
        res.redirect("/admin/categorias");
    });
});

//melhorar pegar o edit pela url nao é melhor? utilizando param
router.post('/categorias/edit', (req, res) => {
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

router.post('/categorias/delete', (req, res)=>{
    Categoria.remove({_id: req.body.id}).then(()=>{
        req.flash("success_msg", "Categoria deletada");
        res.redirect('/admin/categorias');
    }).catch(erro => {
        req.flash("error_msg", "Erro ao deletar");
        res.redirect('/admin/categorias');
    });
});

module.exports = router;