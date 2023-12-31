const mongoose  = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name : {type:String},
    description : {type:String, required:true},
    image:{type:String,required:true},
    price:{type:Number, required:true},
    category : {type:String, required:true},
    date: { type: Date, default: Date.now },
})


module.exports =  mongoose.model('Product', productSchema );