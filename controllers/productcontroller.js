let products=require('../models/productmodel')
exports.getproduct=async(req,res)=>{
    try{
    let productid=req.params.id
   await products.findByIdAndUpdate(productid,req.body)
   res.status(201).json({msg:"products are updated"})
    }catch(error){
        res.json({msg:error.message})
    }
}
exports.createproduct=async(req,res)=>{
    try{
       console.log(req.body)
   await products.insertMany(req.body)
    res.status(201).json({msg:"product saved"})
    }catch(error){
        res.json({msg:error.message})
    }
}
exports.createbulk=async(req,res)=>{
    try{
       console.log(req.body)
   await products.insertMany(req.body)
    res.status(201).json({msg:"product saved"})
    }catch(error){
        res.json({msg:error.message})
    }
}
exports.updateproduct=async(req,res)=>{
    try{
    let productid=req.params.id
   await products.findByIdAndUpdate(productid,req.body)
   res.status(201).json({msg:"products are updated"})
    }catch(error){
        res.json({msg:error.message})
    }
}
exports.deleteproduct=(req,res)=>{
    try{
    let productid=req.params.id
    products.findByIdAndDelete(productid)
    res.status(201).json({msg:"product is deleted"})
    }catch(error){
        res.json({msg:error.message})
    }
}
