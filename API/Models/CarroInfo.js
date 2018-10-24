var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CarroInfo = new Schema({
tipo:{
 type:String,
 required:false
 },
 nome:{
 type:String,
 required:false
},
desc:{
 type:String,
 required:false
},
urlFoto:{
    type:String,
    required:false
 },
 urlVideo:{
  type:String,
  required:false
},
latitude:{
 type:String,
 required:false
},
longitude:{
 type:String,
 required:false
} 
});
module.exports = mongoose.model('CarroInfo', CarroInfo);