let express=require("express")
let cors=require("cors")
let mongoose=require("mongoose")
const rt = require("./routes/rt")
mongoose.connect("mongodb://127.0.0.1:27017/kpcsbend").then(()=>{
    console.log("connection ok")
})

let app=express()
app.use(express.json())
app.use(cors())
app.use("/",rt)
app.listen(5000)