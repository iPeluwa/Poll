const express=require('express');
var app=express();
require('dotenv').config();
var bodyParser=require('body-parser');
var port=process.env.PORT||2002;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/',(req,res)=>{console.log("incoming request is :",req.method,req.body);res.json('Welcome to Bu Polling System BE')});  
/////routing middleware////
app.use('/',require('./controllers/userRoutes'));
//app.use(require('./utils/jwtmiddleware'));
app.use('/',require('./controllers/Routes'));
app.use((req,res)=>{console.log("incoming request is :",req.method,req.body);
res.json('404: Invalid request configured')})

app.listen(port,()=>console.log('Server has been started on PoRT',port));