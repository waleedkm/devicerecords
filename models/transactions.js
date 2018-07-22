var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var transactionSchema = new Schema({
    
    name:String,
    trasactionid:String,
    date:{type:Date,default: Date.now} 
    
});

module.exports = mongoose.model("trasaction",transactionSchema);