var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var owner = require("./owner")
var transactions = require("./transactions")

var devicesSchema = new Schema ({
    
    name: String,
    onecid:{type:Number,required: true, unique:true,index: { unique: true }}, //1
    owner: {type:Schema.Types.ObjectId, ref:'owner'},
    working: {type:Boolean, required:true},
    inwarehouse:String,
    usedin: {type:Schema.Types.ObjectId, ref:'usedarea'},
    trasactions:[{type:Schema.Types.ObjectId, ref:'trasactions'}],
    comments:[String]
    
    
   
    });


module.exports = mongoose.model('devices',devicesSchema);