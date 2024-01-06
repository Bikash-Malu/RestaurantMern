const express=require('express');
const morgan=require('morgan')
const bodyparser=require('body-parser')
const cors=require('cors')
const dotenv=require('dotenv')
const coonectdb=require('./config/config')
// const billmodel=require('../models/billmodel')

//.env config
dotenv.config()

//db call
coonectdb()

//port
const PORT=process.env.PORT||1200
//rest object
const app=express();

//middleware
app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))
app.use(express.json())
app.use(morgan("dev"));

//routes
app.use('/',require('./routes/itemRoute'))
// app.use('/',require('./routes/userRoutes'))
app.listen(PORT,()=>{
    console.log(`app running at port no.:-${PORT}`)
})

