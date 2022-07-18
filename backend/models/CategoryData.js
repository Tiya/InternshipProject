//Accessing Mongose package
const mongoose=require('mongoose');

var conn = mongoose.connection;
conn.on('connected', function() {
    console.log('database is connected successfully');
});
conn.on('disconnected',function(){
    console.log('database is disconnected successfully');
})
//Schema definition
const Schema= mongoose.Schema;

const CategorySchema=new Schema({
    postId : Number,
    categoryName : String
});

//Model creation
var Categorydata= mongoose.model('category',CategorySchema);
module.exports=Categorydata;