var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var LoginSchema = new Schema({
    username:{type: String , required:true},
    email:{type: String, required: true},
    password:{type: String, required:true},
    role:{ type: String, required:true, default: 'user'}

},{timestamps:true})

module.exports = mongoose.model("User",LoginSchema)