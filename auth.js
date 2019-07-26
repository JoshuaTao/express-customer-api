const bcript =require('bcryptjs');
const User =require('./models/User');

module.exports= function authenticate(email,password){
   return new Promise((resolve,reject)=>{
      User.findOne({email})
        .then(user=>{
          if(!user) reject('Authentication Failed'); //email not found
          bcript.compare(password,user.password)
             .then(isMatch=>{
                if(!isMatch) reject('Authentication Failed'); //password not match
                resolve(user);
             })
        })
   })
}