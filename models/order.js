const mongoose  = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    name : {type:String},
    email : {type:String, required:true},
    phone:{type:Number,required:true},
    address:{type:String, required:true},
    status : {type:String, default:'pending'},
    paymentMethod : {type:String, required:true},
    price : {type:Number,required:true},
    items : { type: [{ key: String, value: String }]},
    date: { type: Date, default: Date.now },
})


module.exports =  mongoose.model('Order', orderSchema );