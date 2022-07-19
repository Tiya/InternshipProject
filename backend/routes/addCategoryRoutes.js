const express=require(`express`);
const categoryRouter=express.Router();
const Categorydata = require('../models/Categorydata'); 
const jwt=require('jsonwebtoken')
const path = require('path');
var fs = require('fs');
console.log("in addPostRoutes");
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
  //insertCategory
  categoryRouter.post('/insertCategory',verifyToken,upload.fields([
    {name: "image", maxCount: 1},
  ]),function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE')
    console.log("insertCategory:::");
  
    var category = {             
      categoryName : req.body.categoryName,
                 
   }         
   var category = new Categorydata(category);
   category.save();
  });
  
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