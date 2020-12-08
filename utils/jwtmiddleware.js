const jwt = require("../utils/jwt");

const JWTMiddleware = (req,res, next)=>{
    res.set({"Content-Type": "application/json"});
    console.log(req.headers);
    var token = req.headers['token'];
    console.log("Inside Middleware ",token);
    if(token==undefined){res.json({"msg":"Invalid Token..unauthorised access"})};
    
    var userid = jwt.verifyToken(token);
   
    if(userid){
        req.query.userid = userid;
       next();
    }
    else{
        res.json({"msg":"Invalid Token"});
    }
}
module.exports = JWTMiddleware;