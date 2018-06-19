const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const ChamadaSchema = new Schema({
    nomeChamada : {
        type: String,
        required : true
    },
    data : {
        type : Date,
        default : Date.now
    },
    cor: {
        type: String, 
        label: "Cores"
    }
});

//connect schema to model
mongoose.model('chamadas', ChamadaSchema); 