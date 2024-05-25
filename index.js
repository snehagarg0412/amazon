require("./mongoose")
const pSchema=require("./schema")
const express=require("express")
const multer=require("multer")
const cors=require("cors")
const app=express()
app.use(express.json())
app.use(cors()) 
app.use(express.static("public"))
const storage=multer.diskStorage({

     destination:(req,file,cb)=>
        {
               cb(null,"public/uploads/")

        
        },
        filename:(req,file,cb)=>
            {
                cb(null,file.originalname)
            }

})
const upload=multer({storage:storage}).single("pimg")
app.post("/",(req,resp)=>
{
    
    upload(req,resp,(err)=>{
        if(err)
            {
                resp.send(err)
            }
            else{
                const newdata=new pSchema({
                    pid:req.body.pid,
                    pname:req.body.pname,
                    pprice:req.body.pprice,
                    pcat:req.body.pcat,
                    pdesc:req.body.pdesc,
                    pimg:"https://amazon-4jb4.onrender.com/uploads/"+req.file.filename
                    
                })
                const data=newdata.save()
                resp.send("save data successfully")
}
})

})
app.get("/",async(req,resp)=>
{
    const data=await pSchema.find()
    resp.send(data)
})
app.listen(7000)