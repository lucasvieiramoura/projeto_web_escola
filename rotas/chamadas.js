const express = require('express');
const mongoose = require('mongoose');
const rotas = express.Router();

//load Aluno model
require('../models/Chamada');
const Aluno = mongoose.model('chamadas');


const {
    formatDate,
    returnColors
} = require('../helpers/hbs');


 //Alunos index page
 rotas.get('/', (req, res)=>{
    Aluno.find({})
        .sort({date : 'desc'})
        .then(alunos => {
            res.render('alunos/index', {
                alunos : alunos
            })
        })
    
});

//add lista de chamada form
rotas.get('/callList/:cor', (req, res)=>{
    const pagetitle = 'Lista de Chamadas';
    Aluno.find({
        cor : req.params.cor
    })
    .then(alunos => {
        //pagina a ser renderizada
        res.render('alunos/callList',{
            alunos : alunos
        });
    })
    .catch(err => console.log(err));

});

//edit aluno form
rotas.get('/edit/:id', (req, res)=>{
    const pageTitle = 'Editar Aluno';
    Aluno.findOne({
        _id : req.params.id
    })
    .then(aluno => {
        res.render('alunos/edit', {
            pageTitle : pageTitle,
            aluno : aluno
        });
    })
    .catch(err => console.log(err));
        
});

//process form
rotas.post('/', (req, res)=>{
    pageTitle = 'Lista de Chamada';
    let errors = [];
    if(!req.body.nomeChamada){
        errors.push({text : 'please add a nome'})
    }

    if(errors.length > 0){
        res.render('/callList', {
            pageTitle : pageTitle,
            errors : errors,
            nome : req.body.nomeChamada,
            cor: returnColors(req.body.datanascimento)
        })
    }else{
        const newUser = {
                nome : req.body.nomeChamada,
                cor: returnColors(req.body.datanascimento)
                    };
                    new Chamada(newUser)
                        .save()
                        .then(aluno => {
                            req.flash('success_msg', 'Chamada Concluida');
                            res.redirect('/chamadas')
                        })
                        .catch(err => console.log(err));
    }
});


module.exports = rotas;