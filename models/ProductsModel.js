var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    productName  : {type: String , require :true},
    description : { type: String , require: true},
    price: { type: String , require: true},
    category: { type: String , require: true},
    productImage: { type: String , require: true},
   
},{timestamps: true})

module.exports = mongoose.model("Products",ProductSchema);