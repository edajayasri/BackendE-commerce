const express=require('express')
const cors=require('cors')
let connection=require('./config/db')

//routes
let productroutes=require('./routes/productroute')
let authores=require('./routes/Authroute')
const app=express();

const port=process.env.PORT



//middle ware
app.use(limiter)
app.use(cors())
app.use(express.json())
app.use('/products',)
app.use('/',authroutes)

app.get('/products',async(req,res)=>{
    try{
     let allproducts=await products.find()
     res.status(200).json(allproducts)
    }catch(error){
        res.json({msg:error.message})
    }
})

app.post('/products',async(req,res)=>{
    try{
       await products.create(req.body)
       res.status(201).json({msg:"product saved"})
    }catch(error){
        res.json({msg:error.message})
    }
})

app.post('/bulkproducts',async(req,res)=>{
    try{
       console.log(req.body)
   await products.insertMany(req.body)
    res.status(201).json({msg:"product saved"})
    }catch(error){
        res.json({msg:error.message})
    }
})

app.put('/products/:id',async(req,res)=>{
    try{
    let productid=req.params.id
   await products.findByIdAndUpdate(productid,req.body)
   res.status(201).json({msg:"products are updated"})
    }catch(error){
        res.json({msg:error.message})
    }
})

app.delete('/products/:id',(req,res)=>{
    try{
    let productid=req.params.id
    products.findByIdAndDelete(productid)
    res.status(201).json({msg:"product is deleted"})
    }catch(error){
        res.json({msg:error.message})
    }
})
//registration
app.post('/register',async(req, res) => {
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
)
//login workflow
app.post('/login',async(req,res,next)=>{
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
})
app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})
