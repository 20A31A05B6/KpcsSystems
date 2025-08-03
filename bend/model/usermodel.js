let mongoose=require("mongoose")
let sch=new mongoose.Schema({
    "_id":String,
    "name":String,
    "pwd":String,
    "phno":String,
    "designation":String,
    "department":String,
    "role":{
        type:String,
        default:"user"
    }
})
let um=mongoose.model("user",sch)
module.exports=um