const mongoose=require('mongoose')
let connection=async()=>{
    try{
        await mongoose.connect('process.env.MANGODBURL')
        CONSOLE.LOG('db connected')
    
    }
    catch(error){
        console.log(error.message)
    }
};
module.exports=connection