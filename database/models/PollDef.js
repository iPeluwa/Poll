var mongoose=require("../connection");
var user=require("./Userdef");
var Schema=mongoose.Schema;

const optSchema = new Schema({
    option: String,
    votes: {
      type: Number,
      default: 0,
    },
  });
//var optionSchema=mongoose.model('optionSchema',optSchema);

var PollSchema=new Schema({
   // 'PollId':{type:Number,required:true,unique:true},
    'Question':{type:String,required:true},
    'Description':{type:String},
    'Options':[optSchema],
    'author':{
        type:mongoose.Schema.Types.ObjectId,
        ref:'UserCollection'
    },
    'created_on':{type:Date}
});
var PollCollection=mongoose.model('PollCollection',PollSchema);
module.exports=PollCollection;