var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ownerSchema = new Schema({
    
    name:String,
    department:String
    
});

module.exports = mongoose.model("owner",ownerSchema);