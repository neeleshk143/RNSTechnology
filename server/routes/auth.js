const express = require('express')
const router=express.Router()
const mongoose=require('mongoose')
const User =mongoose.model('User')
const bcrypt=require('bcryptjs')
const jwt =require('jsonwebtoken')
const requireLogin =require('../middleware/requireLogin')
const {JWT_SECRET} =require('../keys')

router.get('/protected',requireLogin,(req,res)=>{
  res.send("hello this is Authorised")
})

router.get('/',(req,res)=>{
    res.send('hello this is Sign Up Route')
})

router.post('/signup',(req,res)=>{
   const {name,email,password}=req.body
   if(!name || !email || !password){
   return res.status(442).json({error:"Please The Add All Value Fields"})
   }
   res.json({massage:"Succesfully Created"})
  User.findOne({email:email})
  .then((savedUser)=>{
    if(savedUser){
        return res.status(441).json({error:"User by this email is already exits"})
    }
 bcrypt.hash(password,12)
  .then(hashedpassword=>{
  new User({
    email,
    password:hashedpassword,
    name
     }).save()
    .then(User => {
      res.json({ message: "You are Signed in successfully" })
    })
    .catch(err=>{
        console.log(err)
   })
 })
  })
  .catch(err=>{
    console.log(err)
  })


 
})
router.post('/signin',(req,res)=>{
  const {email,password}=req.body
  if(!email || !password){
    res.status(422).json({error:"Please provide the Email or Password"})
  }
  User.findOne({email:email})
  .then(savedUser=>{
    if(!savedUser){
      res.status(422).json({error:"Invalide Email"})
    }
    bcrypt.compare(password,savedUser.password)
    .then(doMatch=>{
      if(doMatch){
        const {_id,name,email}=savedUser
        // res.json({massage:"Successfully SignIn"})
        const token=jwt.sign({_id:savedUser._id},JWT_SECRET)
        res.json({token,user:{_id,name,email}})
      }else{
        res.status(422).json({error:" Password "})
      }
    })
  })

})

module.exports=router