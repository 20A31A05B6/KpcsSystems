let bcrypt=require("bcrypt")
let jwt=require("jsonwebtoken")
const um = require("../model/usermodel")
let adduser=async(req,res)=>{
    try {
        let obj=await um.findById(req.body._id)
        if(obj){
            res.json({"msg":"Account Exists"})
        }
        else{
            let pwdhash=await bcrypt.hash(req.body.pwd,10)
            let data=new um({...req.body,"pwd":pwdhash})
            await data.save()
            res.json({"msg":"Registration Successfull"})
        }
    } catch (error) {
        res.json({"msg":"Error in Register"})
    }
}

let login=async(req,res)=>{
    try {
        let obj=await um.findById(req.body._id)
        if(obj){
            let f=await bcrypt.compare(req.body.pwd,obj.pwd)
            if(f){
                res.json({"token":jwt.sign({"_id":obj._id},"1234"),"uid":obj._id,"name":obj.name,"role":obj.role,"department":obj.department,"designation":obj.designation,"phno":obj.phno})
            }
            else{
                res.json({"msg":"check password"})
            }
        }
        else{
            res.json({"msg":"check email"})
        }
    } catch (error) {
        res.json({"msg":"error in login"})
    }
}
let regdata=async(req,res)=>{
    try {
        let data=await um.findOne({"_id":req.params.uid})
        res.json(data)

    } catch (error) {
        res.json({"msg":"error in getting user data"})
    }
}
let getall=async(req,res)=>{
    try {
        let data=await um.find({role:{$ne:'admin'}})
       
        res.json(data)
    } catch (error) {
        res.json({"msg":"error in getting data"})
    }
}
let deldata=async(req,res)=>{
    try {
        let data=await um.findByIdAndDelete({"_id":req.params.uid})
    } catch (error) {
        res.json({"msg":"error in deletion"})
    }
}
let getbyid = async (req, res) => {
    try {
        let data = await um.findById(req.params.uid)
        console.log("UID:", req.params.uid)

        if (!data) {
            return res.status(404).json({ msg: "User not found" })
        }
        res.json(data) // Sends user data
    } catch (error) {
        console.error("Error in getbyid:", error) // Logs error
        res.status(500).json({ msg: "Error in Editing" })
    }
}

let updateUser = async (req, res) => {
  try {
    await um.findByIdAndUpdate(req.body._id, req.body)
    res.json({ "msg": "Updation done" })
  } catch (error) {
    res.json({ "msg": "error in updation" })
  }
}
module.exports={adduser,login,regdata,getall,deldata,getbyid,updateUser}