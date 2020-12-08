const mongoose=require('mongoose');
require('dotenv').config();

//mongoose.connect('mongodb://localhost:27017/PollsMERN');            //dev
//mongoose.connect(process.env.DB_KEY);            //prod
mongoose.connect("mongodb+srv://bu:bu@ipeluwa.cv16q.mongodb.net/bu?retryWrites=true&w=majority");
module.exports=mongoose;