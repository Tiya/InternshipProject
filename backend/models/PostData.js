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

const PostSchema=new Schema({
    postId : Number,
    postTitle : String,
    postImagePath: String,
    postAuthor : String,
    postCategory : String,
    postDescription : String,
    postDate: String,
    postAuthor: String

});

//Model creation
var Postdata= mongoose.model('posts',PostSchema);
module.exports=Postdata;