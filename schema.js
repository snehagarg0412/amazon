const mongoose=require("mongoose")
const pSchema=new mongoose.Schema({

     pid:Number,
     pname:String,
     pprice:Number,
     pcat:String,
     pdesc:String,           
     pimg:String,
    
})



module.exports=mongoose.model("products",pSchema)