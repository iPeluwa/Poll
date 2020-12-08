var express=require('express');
var route=express.Router();


route.post('/signup',(req,res)=>{           // reqObject-->{"userid":"","password":"","email":"","contact":""}
    var reqObject=req.body;
    console.log('req body is : ',reqObject);
    var operations=require('../database/helpers/Operation');
    operations.addUser(reqObject,res);
});
 
// /login
route.post('/login',(req,res)=>{            // reqObject -->{"userid":"","password":""}
    var reqObject=req.body;
   // console.log('req body is : ',reqObject);
    var operations=require('../database/helpers/Operation');
    operations.searchUser(reqObject,res);
});
module.exports=route;