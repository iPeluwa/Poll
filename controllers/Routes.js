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



route.get('/xyz',(req,res)=>{       //testing url string
    console.log(req.body);
res.send('welcome bitches again');
});

// /createpoll
route.post('/createPoll',(req,res)=>{  //reqObject -->{question:"",description:"",user_Id:"",options:["option1","option2","option3","option4"],createdOn:"Date"}
    var reqObject=req.body;
    //console.log('req body is : ',reqObject);
    var operations=require('../database/helpers/Operation');
    operations.addPoll(reqObject,res);
});

// /getlistofpolls
route.post('/getListofPolls',(req,res)=>{    //reqObject -->{}
    var reqObject=req.body;
var operations=require('../database/helpers/Operation');
operations.getlistofpolls(reqObject,res);
});

route.post('/deletePoll',(req,res)=>{        //reqObject --> {u_id:"",poll_id:""}
    var reqObject=req.body;
var operations=require('../database/helpers/Operation');
operations.deletepoll(reqObject,res);
});

route.post('/findPoll',(req,res)=>{             //reqobject--> {poll_id:""}
    var reqObject=req.body;
var operations=require('../database/helpers/Operation');
operations.searchpoll(reqObject,res);
});

//  /vote
route.post('/vote',(req,res)=>{                  //reqObject -->{"u_id":"","p_id":"","o_id":""}
    var reqObject=req.body; 
var operations=require('../database/helpers/Operation');
operations.vote(reqObject,res);
});

//myVotedPollsandSelectedOptions
route.post('/myVotes',(req,res)=>{           //{"u_id":""}
    var reqObject=req.body;
var operations=require('../database/helpers/Operation');
operations.mypollsandselectedoption(reqObject,res);
});

route.post('/totalVotes',(req,res)=>{           //{"p_id":""}
    var reqObject=req.body;
var operations=require('../database/helpers/Operation');
operations.totalVotes(reqObject,res);
});

route.post('/getAuthor',(req,res)=>{            //reqObject -->{'u_id':""}
var reqObject=req.body;
var operations=require('../database/helpers/Operation');
operations.getAuthor(reqObject,res);
});

route.get('/getUserIds',(req,res)=>{            
var reqObject=req.body;
var operations=require('../database/helpers/Operation');
operations.getUserIds(reqObject,res);
});

//  /editprofile

// /deleteprofile

//  /mypolls
route.post('/myPolls',(req,res)=>{            //reqObject -->{'u_id':""}
    var reqObject=req.body;
var operations=require('../database/helpers/Operation');
operations.mypolls(reqObject,res);
});
module.exports=route;
