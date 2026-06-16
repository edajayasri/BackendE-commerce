let users=require('../models/usermodel')
let bcrypt=require('bcrypt')
let jwt=reuire('jsonwebtoken')
let dotenv=require('dotenv').config()

exports.register=async(req, res) => {
    try{
        const {username, password, email, role} = req.body;

        // Any field is empty
        if(!username || !password || !email || !role)
            return res.json({"msg":"Missing fields"});

        // User already exist or not
        let checkUser = await users.findOne({username})
        if(checkUser) return res.json({"msg":"User already exist"})

        // Hash the password
        let hashPassword = await bcrypt.hash(password, 10);

        // create the user and store in database.
        await users.create({username, password:hashPassword, email, role})

        //Generate a json web token
        let payload={username:username,emailaddress:email,role:role}
        let token=await jwt.sign(payload,secretkey,{expiresIn:'1hr'})
       

        // To Send a mail to user
        await mail(email, username);
        res.json({"msg":"Registration Successful...",token})
    }
    catch(err){
        res.json({msg:err.message});
    }
}

exports.login=async(req,res,next)=>{
    try{
    const {username,password}=req.body
    if(!username || !password) return res.json({"msg":"missing fields"})
    let checkuser=await users.findOne({username})
if(!checkuser) return res.status(201).json({"msg":"user not found"})
let ishashverified=await bcrypt.compare(password,checkuser.password)
if(!ishashverified) return res.json({"msg":"username or password is wrong"}) 
//verified 
let token =req.headers.authorization.split(' ')[1]
let isValid=await jwt.verify(token,secretkey)
if(!isValid) return res.json({"msg":"invalid token"})
    res.json({msg:"login Successful"})
}catch(error){
    next(error.message)
}
}