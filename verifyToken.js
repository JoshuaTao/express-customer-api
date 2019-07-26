const config= require('./config');
const jwt= require('jsonwebtoken');

module.exports = function verifyToken (req,res,next){
    const bearerHeader =req.headers['authorization'];
    if(typeof bearerHeader !=='undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        jwt.verify(bearerToken,config.JWT_SECRET,(err,decoded)=>{
            if(err) return res.send(err);
              next();
            })
    }else{
        res.sendStatus(403);
    }
  }