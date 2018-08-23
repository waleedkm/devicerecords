var mongoose = require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose")


var Schema = mongoose.Schema;
var loginSchema = new Schema({

    
    
});



loginSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model("logins",loginSchema);