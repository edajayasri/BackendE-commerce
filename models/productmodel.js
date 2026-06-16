const mongoose=require("mongoose");
let productschema=new mongoose.Schema({
id:{type:Number,required:true},
title:{type:String,required:true},
price:{type:Number,required:true},
description:{type:String,required:true},
category:{type:String,required:true},
image:{type:String,required:true},
rating:{rate:Number,count:Number}
})
module.exports=mongoose.model("Product",productschema)