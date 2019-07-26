const express =require('express')
const router =express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const auth =require('../auth');
const jwt = require('jsonwebtoken');
const config = require('../config');


router.post('/register',(req,res)=>{
    const {email,password}= req.body;
    User.findOne({email})
    .then(user=>{
        if(user) return res.json({msg:'Email is already registered'});
        const newUser = new User({
            email,
            password
        })
       bcrypt.genSalt(10,(err,salt)=>{
           bcrypt.hash(newUser.password,salt,(err,hash)=>{
               if(err) throw err;
               newUser.password = hash;
               newUser.save()
                 .then(()=>res.sendStatus(201))
                  .catch(err=>console.log(err))
           })
       })
     })
})

router.post('/auth',(req,res)=>{
    const {email,password}= req.body;
    auth(email,password)
       .then(user=>{
         const token=jwt.sign(user.toJSON(),config.JWT_SECRET,{expiresIn:'30m'}) //没有toJSON()的话出问题
         res.send({token});
       })
        .catch(err=>res.send(err))
})

module.exports = router;