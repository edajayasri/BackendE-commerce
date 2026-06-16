//npm i mongoose
const express = require('express'); 
let connection = require('./config/db.js')
let cors = require('cors')  //--> middleware to handle cross id. npm i cors
let limiter=require('./middlewares/ratelimit.js')
//Routes
let productroutes=require('./routes/productroute.js')
let authroutes=require('./routes/Authroute.js')
//let secretkey=process.env.SECRETKEY
const app = express();
const port = process.env.PORT;


app.use(cors());
app.use(limiter);
app.use(express.json());
app.use('/products',productroutes)
app.use('/',authroutes)


app.listen(port, ()=>{
    console.log(`server is running on ${port}`);
    connection();
})