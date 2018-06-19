const moment = require('moment');
const mongoose = require('mongoose');

module.exports = {
    formatDate: function(date, format){
        return moment(date).format(format);
    },
    returnColors: function(date) {
     
   //funçao da data
        const data = date ? moment().diff(moment(date), "year") : -1;
    
        if(data > 0 && data < 2)
           return "rosa"; 
      
        if(data > 2 && data < 2.5 )
           return "branca";
      
        if(data > 2.5 && data <= 3)
          return "roxo";
      
        if(data == 4)
           return "vermelho";
      
        if(data == 5)
          return "verde"; 
            
        if(data == 6)
           return "azul";
      
        if(data == 7)
           return "amarelo"; 
      
        if(data == 8)
           return "prata"
           
        if(data == 9)
           return "laranja";
      
      
        return "sem cor vaido"; 
    }

}

