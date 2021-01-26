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
    res.render('admin/categorias.handlebars');
});

router.get('/categorias/add/', (req, res)=>{
    res.render('admin/addcategorias.handlebars');
});

router.post('/categorias/nova',(req, res)=>{
    const novaCategoria = {
        nome: req.body.nome,
        slug: req.body.slug
    }
    new Categoria(novaCategoria).save().then(()=>{
        console.log("salvo");
    }).catch((erro)=>{
        console.log("Erro: " + erro);
    });
});

module.exports = router;