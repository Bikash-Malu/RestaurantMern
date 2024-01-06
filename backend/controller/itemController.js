const itemmodel=require('../models/itemModel')
const usermodel=require('../models/User')
const billmodel=require('../models/billmodel')
const bcrypt=require('bcrypt');
const jwt = require("jsonwebtoken");
const jwtsecret=process.env.jwtsecret;
 const getItem=async(req,res)=>{
    try{
        const items=await itemmodel.find({})
        res.status(200).send(items)
    }
    catch(error){
        console.log(error)
    }
}
const saveitem=async(req,res)=>{
    try{
    const data=req.body;
    const items= await new itemmodel(data).save()
    res.status(200).send(items)
    }
    catch(error){
        console.log(error)
        res.status(400).send("can not be add")
    }
}
   const deleteitem=async(req,res)=>{
    try{
        const a=req.params.id;
        let item=await itemmodel.deleteOne({_id:a})
        res.status(201).send(item)
    }
    catch(error){
        res.status(400).send(error)
    }
   }
   const upadteitem=async(req,res)=>{
    try{
    const a=req.params.id;
    const b=req.body;
    let result=await itemmodel.updateOne({_id:req.body.itemId},b)
    res.status(200).send(result)
    }
    catch(error){
        res.status(400).send(error)
    }
   }
 const signup=async(req,res)=>{
    try{
    let a=req.body;
    console.log(a)
    const salt=await bcrypt.genSalt(10);
    let pass=await bcrypt.hash(a.password,salt);
    a.password=pass;
    console.log(a)
    let data=await new usermodel(a).save();
    res.status(200).send(data)
    }
    catch(error){
        res.status(400).send(error)
    }
 } 
const login=async(req,res)=>{
let email=req.body.email;
let user=await usermodel.findOne({email})
if(user){
    const data={
        one:{
            id:user.id
        }
       }
const expirationTime='1h';
const autotoken=jwt.sign(data,jwtsecret,{expiresIn:expirationTime})
const newpwd = await bcrypt.compare(req.body.password, user.password);
if (newpwd) {
    res.json({user,autotoken:autotoken});
  } else {
    return res.status(400).send("password is not correct");
  }
} else {
  res.status(400).send("email not correct")
}
}
const search=async(req,res)=>{
    try{
        const a=req.params.key;
        let data=await itemmodel.find({
            "$or":[
                {"name":{$regex:a}}
            ]
        })
        res.status(200).send(data)
    }
    catch(error){
        res.send(error)
    }

}
const addbills=async(req,res)=>
{
    try{
        const data=req.body;
        const items= await new billmodel(data).save()
        res.status(200).send(items)
        }
        catch(error){
            console.log(error)
            res.status(400).send("can not be add")
        }
}

    const getbill=async(req,res)=>{
        try{
            const items=await billmodel.find({})
            res.status(200).send(items)
        }
        catch(error){
           res.status(400).send(error)
        }
    }

module.exports={getItem,addbills,saveitem,deleteitem,upadteitem,signup,login,search,getbill}
