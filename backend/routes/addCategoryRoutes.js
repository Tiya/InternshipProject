const express=require(`express`);
const categoryRouter=express.Router();
const Categorydata = require('../models/Categorydata'); 
const jwt=require('jsonwebtoken')
const path = require('path');
var fs = require('fs');
console.log("in addCategoryRoutes");
  const cors = require('cors');
  var bodyparser=require('body-parser');
  categoryRouter.use(bodyparser.json({
    limit: "200mb",
    type:'application/json'
  }));
  categoryRouter.use(bodyparser.urlencoded({
    limit: "200mb",  
    extended: true,
    parameterLimit: 1000000
  }));
  categoryRouter.use(cors());
  //get single category
  categoryRouter.get('/:id',verifyToken,  (req, res) => {
  
    const id = req.params.id;
    Categorydata.findOne({"_id":id})
      .then((category)=>{
          res.send(category);
      });
  })
  //get all categories
  categoryRouter.get('/',verifyToken, function (req, res) {

    Categorydata.find()
              .then(function(categories){
                  res.send(categories);
              })
    })    
  
  //insertCategory
  categoryRouter.post('/insertCategory',verifyToken,function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE')
    console.log("insertCategory:::");
  
    var categories = {             
      categoryName : req.body.categoryName,
                 
   }         
   var categories = new Categorydata(categories);
   categories.save();
  });

  // delete category

  categoryRouter.delete('/remove/:id',verifyToken,(req,res)=>{
   
    id = req.params.id;
    console.log(id);
    Categorydata.findByIdAndDelete({"_id":id})
    .then(()=>{
        console.log('success category deleted')
        res.send();
    })
  })

  //update category name

  categoryRouter.put('/update',verifyToken, (req,res)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE')
    console.log(req.body)
    console.log(req.body._id)
    id=req.body._id,
    categoryName = req.body.categoryName,
         
   
    Categorydata.findByIdAndUpdate({"_id":id},
                                {$set:{
                                "categoryName":categoryName
                                 }})
   .then(function(){
    
       res.send();
   })
  })
  
  module.exports=categoryRouter;


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