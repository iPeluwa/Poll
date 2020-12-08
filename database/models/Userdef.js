const mongoose=require("../connection");
var Schema=mongoose.Schema;

var UserSchema=new Schema({
'userid':{type:String,unique:true,required:true},
'password':{type:String,required:true},
'email':{type:String,required:true},
'contact':{type:Number,required:true},
'polls':[{type:mongoose.Schema.Types.ObjectId, ref:'PollCollection'}],
'voted':[{p_id:{type:mongoose.Schema.Types.ObjectId,ref:'PollCollection'},option:{}}]
});
var UserCollection=mongoose.model('UserCollection',UserSchema);
module.exports=UserCollection;