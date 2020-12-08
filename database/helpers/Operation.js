const userCollection=require("../models/Userdef");
const pollCollection=require("../models/PollDef");
const jwt=require("../../utils/jwt");
var shortuuid=require('short-uuid');
//console.log(shortuuid.generate());

const operations={

addUser(reqObject,res){
console.log('adding user');
userCollection.create(reqObject,err=>{
    if(err){
        console.log('err :',err);
        res.send('Error during adding user');
    }
    else{res.json('User Added Successfully')}
});
},

searchUser(reqObject,res){
console.log('searching user');
userCollection.findOne({'userid':reqObject.userid},(err,doc)=>{
if(err){
    console.log('err is :',err);
res.send('Invalid User Credentials');
}
else if(doc){
    console.log('doc is :',doc);
    if(doc.password==reqObject.password){
        //res.send('Welcome '+reqObject.userid);
        var token = jwt.generateToken(reqObject.userid);
        console.log(token);
        
        //doc['token']=token;
   res.send({doc:doc._id,token});
    }
    else{
        res.send('Invalid User Credentials');
    }
}
else{
    res.send('Invalid User Credentials');
}
});
},

async addPoll(reqObject,res){ 
     //requestObj will be like :
     // {question:"",description:'',user_Id:"user._id",options:["option1","option2","option3","option4"],createdOn:"Date"}
     //
//var pollId=shortuuid.generate();
//reqObject.PollId=pollId;
var {question,description,options,created_on}=reqObject;
var USERID=reqObject.user_Id;
var user=await userCollection.findById(USERID,(err,doc)=>{
    if(err){
        console.log('error occured in userfind :line 51');
        res.send('error ocurred');
    }
});
options=options.map(opt=>({option:opt,votes:0}));
console.log("line 55",question,options);
console.log(toString(user.userid));
var poll=await pollCollection.create({
    //'PollId':pollId,
    'Question':question,
    'Description':description,
    'Options': options,
    'author':user,
    'created_on':created_on
    //'created_on':Date.now()
},async (err,doc)=>{
    if(err){
        console.log(err);
        console.log('error inside pollcreation :line 65');
        res.send('error while adding poll');
    }
    else if(doc){
    //    res.send('Poll added')
await user.polls.push(doc._id);
await user.save();
console.log('inside else doc._id is', doc._id);
console.log(user);
}
});
console.log("poll created is",poll);

      //  user.polls.push(poll._id);
      //  await user.save();
        res.send("Poll added");
    // exports.createPoll = async (req, res, next) => {
    //     const { id } = req.decoded;
    //     const { question, options } = req.body;
    //     try {
    //       const user = await db.User.findById(id);
    //       const poll = await db.Poll.create({
    //         question,
    //         user,
    //         options: options.map(option => ({ option, votes: 0 })),
    //       });
    //       user.polls.push(poll._id);
    //       await user.save();
      
    //       return res.status(201).json({ ...poll._doc, user: user._id });
    //     } catch (err) {
    //       return next({
    //         status: 400,
    //         message: err.message,
    //       });
    //     }
    //   };

},
searchpoll(reqObject,res){
    //reqobject--> {poll_id:''}
    pollCollection.findOne({_id:reqObject.poll_id},(err,doc)=>{if(err){res.send('error while finding poll')}else if(doc){res.send(doc);}});
},
//{"Question":1,"author":1,"_id":0,"Options":0}
getlistofpolls(reqObject,res){
    //reqObject -->{}
    pollCollection.find({},(err,doc)=>{if(err){res.send('error while finding poll list')}else if(doc){res.send(doc);}});
},

async vote(reqObject,res){
//reqObject -->{"u_id":"","p_id":"","o_id":""}
//user=userCollection.findbyid(u_id)
//if(p_id is not in user.voted.p_id) {
//user.voted.push({p_id,o_id});
//poll=pollCollection.findbyid(p_id);
//poll.options=poll.options.map(option)=>{if(option._id==reqObject.o_id){option.votes+1}}
//  }


var user= await userCollection.findById(reqObject.u_id);

var objarr=user.voted.filter(obj=>obj.p_id==reqObject.p_id);
if(objarr.length>0){
    res.send('you have already casted your vote for this poll');  
}
else if(objarr.length==0){
   await user.voted.push({p_id:reqObject.p_id,option:reqObject.o_id});
   await user.save();
   var poll=await pollCollection.findById(reqObject.p_id);
   console.log(poll.Options);
   var newOptionArray=poll.Options.map(opt=>opt._id==reqObject.o_id?{_id:opt._id,option:opt.option,votes:opt.votes+1}:opt);
   poll.Options=newOptionArray; 
   await poll.save();
   console.log(user);
    console.log(poll);
   res.send('vote added');
}
},

getAuthor(reqObject,res){
    
    userCollection.findById(reqObject.u_id,(err,doc)=>{
        if(err){
            console.log('err is :',err);
        res.send('Invalid User Credentials');
        }
        else if(doc){
            console.log('doc is :',doc);
           res.send(doc.userid);
        }
        });

},
getUserIds(reqObject,res){
    userCollection.find({},'_id userid',(err,doc)=>{
        if(err){res.send(err)}
        else{
            res.send(doc);
        }
    })

},

deletepoll(reqObject,res){
    console.log(reqObject);
//reqObject --> {u_id:"",poll_id:""}
//<<<imp> handle on on fe>></imp>
//check for user deletion authorisation, i.e. if(user.polls has poll or not) 
//<<<imp> handle on on fe>></imp>


//also to remove voted id from voted in users who has voted for that Poll


userCollection.updateOne({_id:reqObject.u_id},{$pull:{polls:reqObject.poll_id}},(err,doc)=>{
    if(err){
        res.send("couldn't delete Aborted ");
    }
    else if(doc){
        pollCollection.deleteOne({_id:reqObject.poll_id},(err,doc)=>{
            if(err){res.send("couldn't delete from polls")}
            else if(doc){console.log(doc);res.send('poll deleted');}
        });
    }
});
    
},

mypollsandselectedoption(reqObject,res){
//{"u_id":""}
//user.voted
userCollection.findById(reqObject.u_id,(err,doc)=>{
    if(err){res.send('Error while finding user records');}
    else if(doc){res.send(doc.voted)}
});
},
totalVotes(reqObject,res){
    //reqObject -->{'p_id':""}
pollCollection.findOne({_id:reqObject.p_id},(err,doc)=>{
    if(err){res.send("couldn't find poll...aborted")}
    else if(doc){
        var ttl=0;
        doc.Options.forEach(option => {ttl=ttl+ option.votes});
   console.log(ttl);
        res.send({"ttl":ttl});
    }
});
},
deleteprofile(){},
editprofile(){},
editpoll(){},

mypolls(reqObject,res){
    //reqObject -->{'u_id':""}
    userCollection.findOne({_id:reqObject.u_id},(err,doc)=>{
        if(err){res.send('error occured in looking for user polls')}
        else if(doc){
                pollCollection.find({_id:{$in:doc.polls}},(err,doc)=>{
                    if(err){res.send("error occured in sending polls")}
                    else if(doc){res.send(doc)}
                });
        }
    });
}
}
module.exports=operations;