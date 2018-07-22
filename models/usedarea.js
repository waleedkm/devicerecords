var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var usedareaSchema = new Schema({
    
    name:String,
    users:[String]
    
});

module.exports = mongoose.model("usedarea",usedareaSchema);