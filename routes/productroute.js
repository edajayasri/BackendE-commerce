const express=require('express')
let route=express.Router();
const {createproduct,getproduct,uodateproduct,deleteproduct,createbulk}=require('../constroller')
router.get('/',getproduct)
router.post('/',createproduct)
router.post('/bulk',createbulk)
router.put('/:id',deleteproduct)
modue.exports=router
