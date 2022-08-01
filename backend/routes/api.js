const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
let alert = require('alert'); 

const db = "mongodb+srv://FSDGroup3:Fsdgp3.123@cluster0.1f3izav.mongodb.net/MyBlogApp?retryWrites=true&w=majority";

mongoose.connect(db, err=>{
    if(err){
        console.log('Error!' + err);
    }
    else{
        console.log('Connected to MongoDB')
    }
})

router.get('/', (req,res)=>{
    // res.send('Hello from API route');
   
    User.find()
    .then(function(user){
        res.send(user);
    })
       
})

router.post('/signup', (req,res)=>{

    console.log("signup");
    let userData = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });

      if((userData.email)=='admin@domain.com'&&(userData.password)=='admin1234'){
       alert("Hi! You can't Sign Up with Admin Credentials")
        }
         else {
            userData.role = 'Author';
          // let user = new User(userData);
          userData.save((error,resgisteredUser)=>{
              if(error){
                  console.log(error);
              }
              else{
                  let payload={subject:resgisteredUser};
                  let token =jwt.sign(payload,'secretKey')
                  res.status(200).send({token});
                  // res.status(200).send(resgisteredUser);
              }
          })
      }
    }
)

router.post('/login',(req,res)=>{
    console.log("login");
    let userData = new User({
        email: req.body.email,
        password: req.body.password
      });
      console.log("login user:::", userData);
      console.log("login user:::", userData.email);
      console.log("login user:::", userData.password);
      if(userData.email=="admin@domain.com" && userData.password=="admin1234")
      {
            userData.username="Admin";
            userData.role="SuperAdmin";
            let payload={subject:userData};
            let token =jwt.sign(payload,'secretKey')
            res.status(200).send({token});
        }
        else{
    User.findOne({email : userData.email},(error,user)=>
    {
        console.log("login registered user:::", user);
        if(error)
        {
            console.log(error);
        }
        else{
            if(!user)
            {
                res.status(401).send('Invalid Email');
            }
            else
            if(user.password!== userData.password)
            {
                res.status(401).send('Invalid Password');
            }
            else{
                let payload={subject:user};
                let token =jwt.sign(payload,'secretKey')
                res.status(200).send({token});
                // res.status(200).send(user);
            }
        }
    })
      }
    }
)
//get single user details
router.get('/:id',verifyToken,  (req, res) => {
  
    const id = req.params.id;
    User.findOne({"_id":id})
      .then((user)=>{
          res.send(user);
      });
  })
//delete user

router.delete('/remove/:id',verifyToken,(req,res)=>{
   
    id = req.params.id;
    console.log(id);
    User.findByIdAndDelete({"_id":id})
    .then(()=>{
        console.log('success')
        // alert("Post deleted successfully");
        res.send();
    })
  })

  // update user details

  router.put('/update',verifyToken, (req,res)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE')
    console.log(req.body)
    console.log(req.body._id)
    id=req.body._id,
    username = req.body.username,
    email = req.body.email,
    role = req.body.role, 
    password = req.body.password 
   
    User.findByIdAndUpdate({"_id":id},
                                {$set:{
                                "username":username,
                                "email":email,
                                "role":role,
                                "password":password,
                                 }})
   .then(function(){
       res.send();
   })
  })
module.exports = router;

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