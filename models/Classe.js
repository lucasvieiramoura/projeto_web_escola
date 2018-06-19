const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const ClasseSchema = new Schema({
  
    nome: {
        type: String,
        required: true
    },
    cor: {
        type: String,
        required: true
    },
    numbersala:{
        type: Number,
        required: true
    },
    capacidade: {
        type: Number,
        required: true
    },
    professores:{
        type: String,
        required: true
    },
    
});
mongoose.model('classes', ClasseSchema);