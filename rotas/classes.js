const express = require('express');
const mongoose = require('mongoose');
const rotas = express.Router();

//load Classe model
require('../models/Classe');
const Classe = mongoose.model('classes');

//load de Aluno para ordenação de classe por cor
require('../models/Aluno');
const Aluno = mongoose.model('alunos');

 //Alunos index page
 rotas.get('/', (req, res)=>{
    Classe.find({})
        .sort({date : 'desc'})
        .then(classes => {
            res.render('classes/index', {
                classes : classes
            })
        })
    
});

//add aluno form
rotas.get('/add', (req, res)=>{const title = 'Cadastro de Classes'; res.render('classes/add',{title : title});
});


//edit aluno form
rotas.get('/edit/:id', (req, res)=>{
    const pageTitle = 'Editar Classe';
    Classe.findOne({
        _id : req.params.id
    })
    .then(classe => {
        res.render('classes/edit', {
            pageTitle : pageTitle,
            classe : classe
        });
    })
    .catch(err => console.log(err));
        
});

//Busca de sala por por especifica
//caminho no navegador
rotas.get('/sala/:cor', (req, res)=>{
    const pageTitle = 'Aluno por Sala';
    Aluno.find({
        cor : req.params.cor
    })
    .then(alunos => {        
        req.flash('success_msg','Sala por Cor');
        //pagina a ser renderizada
        res.render('alunos/index',{
            pageTitle : pageTitle,
            alunos : alunos
        });
    })
    .catch(err => console.log(err));
});

rotas.get('/salas', (req, res)=>{
    const pageTitle = 'Classes Agrupadas por cor';
    Aluno.find({
        $query:{} ,$orderby: {cor: 'desc'}
    })
    .then(salas =>{
        res.render('classe/index',{
            pageTitle : pageTitle,
            salas : salas
        })
    })
});

//process form
rotas.post('/', (req, res)=>{
    pageTitle = 'Editar Classe';
    let errors = [];
    if(!req.body.nome){
        errors.push({text : 'please add a nome'})
    }
    if(!req.body.cor){
        errors.push({text : 'please add Cor da turma'})
    } 
    if(!req.body.numbersala){
        errors.push({text : 'please add Numero da Sala'})
    } 
    if(!req.body.capacidade){
        errors.push({text : 'please add Capacidade da sala'})
    }
    if(!req.body.professores){
        errors.push({text : 'please add Professores'})
    }

    if(errors.length > 0){
        res.render('/add', {
            pageTitle : pageTitle,
            errors : errors,
            nome : req.body.nome,
            cor : req.body.cor,
            numbersala : req.body.numbersala,
            capacidade : req.body.capacidade,
            professores : req.body.professores,
        })
    }else{
        const newUser = {
            nome : req.body.nome,
            cor : req.body.cor,
            numbersala : req.body.numbersala,
            capacidade : req.body.capacidade,
            professores : req.body.professores,                   
        };
                    new Classe(newUser)
                    .save()
                    .then(classe => {
                        req.flash('success_msg', 'Classe Adicionado');
                        res.redirect('/classes')
                    })
                    .catch(err => console.log(err));
    }

});

//edit form process
rotas.put('/:id', (req, res)=>{
    Classe.findOne({
        _id : req.params.id
    })
    .then(classe => {
        //new values from form
        classe.nome = req.body.nome,
        classe.cor = req.body.cor,
        classe.numbersala = req.body.numbersala,
        classe.capacidade = req.body.capacidade,
        classe.professores = req.body.professores,  

        classe.save()
            .then(classe => {
                req.flash('success_msg', 'Classe Alterada');
                res.redirect('/classes');
            })
    });
});

module.exports = rotas;