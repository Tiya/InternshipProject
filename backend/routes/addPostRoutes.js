const express=require(`express`);
const postsRouter=express.Router();
const Postdata = require('../models/PostData');
const Categorydata = require('../models/Categorydata');
const multer=require('multer')
const jwt=require('jsonwebtoken')
const path = require('path');
var fs = require('fs');
const alert = require('alert');


console.log("in addPostRoutes");
  const cors = require('cors');
  var bodyparser=require('body-parser');
  postsRouter.use(bodyparser.json({
    limit: "200mb",
    type:'application/json'
  }));
  postsRouter.use(bodyparser.urlencoded({
    limit: "200mb",  
    extended: true,
    parameterLimit: 1000000
  }));
  var fs = require('fs');
var dir = '../frontend/src/assets/images';

  if (!fs.existsSync(dir)){
    // console.log("new: "+dir);
      fs.mkdirSync(dir);
  }

  
  postsRouter.use(cors());

  const storage = multer.diskStorage({
    destination:(req,file, callback)=>{
      callback(null, '../frontend/src/assets/images/files')
    },
    filename:(req, file, callback)=>{
      callback(null, file.fieldname+Date.now()+path.extname(file.originalname));
    }
  })
  var upload = multer({
    storage: storage,
    limits:{
      fileSize: 10000000  //upto 10MB files only
    },
    fileFilter:function(req,file,callback){
      checkFileType(file, callback);
    }
  })
//Check file type
function checkFileType(file, callback){

  const filetypes = /jpeg|jpg|png|gif/;
  //check extension
  const extname=filetypes.test(path.extname(file.originalname).toLowerCase());
  //check mime
  const mimetype=filetypes.test(file.mimetype);
  if(mimetype&&extname){
    return callback(null, true);
  }else{
    callback('Error: Images only');
  }
}
postsRouter.get('/:id',verifyToken,  (req, res) => {
  
  const id = req.params.id;
  Postdata.findOne({"_id":id})
    .then((post)=>{
        res.send(post);
    });
})

postsRouter.get('/',verifyToken, function (req, res) {
  Postdata.find()
            .then(function(posts){
                res.send(posts);
            })
  })    

  postsRouter.post('/insert',verifyToken,upload.fields([
    {name: "image", maxCount: 1},
  ]),function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE')
    console.log("images:::"+req.files.image[0].filename);

    var post = {             
        postTitle : req.body.postTitle,
        postAuthor : req.body.postAuthor,
        postCategory : req.body.postCategory,
        postDescription : req.body.postDescription,
        postDate: req.body.postDate,
        postImagePath : req.files.image[0].filename           
   }         
   var post = new Postdata(post);
   post.save();
});
// //insertCategory
// postsRouter.post('/insertCategory',verifyToken,upload.fields([
//   {name: "image", maxCount: 1},
// ]),function(req,res){
//   res.header("Access-Control-Allow-Origin","*")
//   res.header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE')
//   console.log("insertCategory:::");

//   var category = {             
//     categoryName : req.body.categoryName,
               
//  }         
//  var category = new Categorydata(category);
//  category.save();
// });
postsRouter.delete('/remove/:id',verifyToken,(req,res)=>{
   
  id = req.params.id;
  console.log(id);
  Postdata.findByIdAndDelete({"_id":id})
  .then(()=>{
      console.log('success')
      // alert("Post deleted successfully");
      res.send();
  })
})

postsRouter.put('/update',verifyToken, upload.fields([
  {name: "image", maxCount: 1},
]),(req,res)=>{
  res.header("Access-Control-Allow-Origin","*")
  res.header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE')
  console.log(req.body)
  console.log(req.body._id)
  id=req.body._id,
  postTitle = req.body.postTitle,
  postAuthor = req.body.postAuthor,
  postCategory = req.body.postCategory,
  postDescription = req.body.postDescription,
  postDate= req.body.postDate,
  postImagePath= req.files.image[0].filename 
 
      
 
  Postdata.findByIdAndUpdate({"_id":id},
                              {$set:{
                              "postTitle":postTitle,
                              "postAuthor":postAuthor,
                              "postCategory":postCategory,
                              "postDescription":postDescription,
                              "postDate":postDate,
                              "postAuthor":postAuthor,
                              "postImagePath": postImagePath
                               }})
 .then(function(){
  
     res.send();
 })
})

  module.exports=postsRouter;


  function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorised Request');
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token==='null'){
        return res.status(401).send('Unauthorised Request');
    }
    let payload = jwt.verify(token, 'secretKey');
    if(!payload){
        return res.status(401).send('Unauthorised Request');
    }
    req.userId = payload.subject;
    next()
}