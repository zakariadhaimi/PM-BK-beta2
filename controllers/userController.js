var User = require('../models/User');
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const nodemailer = require('nodemailer');

dotenv.config()


function addUser(req, res,next) {
   const hash = bcrypt.hashSync(req.body.password, 10);
req.body.password=hash
    let user = new User(req.body);
   
    user.save(function (err,data) {
        if (err) res.send(err);
        else  res.send(true)

    });
 

}

function conffirmWithEmail(req , res){

    const code=req.body.code
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'testdevlop74@gmail.com',
          pass: 'advvnmmxhicpmdff'
        }
      });
      
      var mailOptions = {
        from: 'testdevlop74@gmail.com',
        to: 'testdevlop175@gmail.com',
        subject: 'Page jaune  modifier mot de passe',
        text: 'bonjour votre code vérification est : ' ,
        html: "<strong>Hello world? {+code}</strong>",
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
            res.json({status:"succes"})
        }
      });
      res

}

function getUser(req, res,next) {
    let email = req.query.email;
    User.findUser(email ).then(data => {
        if(data!="not exist"){
         return   res.json("exist")
        }
        
        return  res.json(data)
    })
        .catch(err => {
            next(err)
        });

}

function checkAndSendCode(req, res,next) {
    let email = req.query.email;
    let code = req.query.code;

   
    User.findUser(email ).then(data => {
        if(data!="not exist"){

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'testdevlop74@gmail.com',
                  pass: 'advvnmmxhicpmdff'
                }
              });
              
              var mailOptions = {
                from: 'testdevlop74@gmail.com',
                to: email,
                subject: 'Page jaune  modifier mot de passe',
                text: 'bonjour votre code vérification est  : '+code,
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  return  res.json({status:"succes"})
                }
              });

        }
        
        else{
            return  res.json(data)
        }
    })
        .catch(err => {
            next(err)
        });

}

function getPaswword(req, res,next) {
    let useID = req.query.userID;
    User.getPassword(useID ).then(data => {
        res.json(data)
    })
        .catch(err => {
            next(err)
        });

}

function getComments(req, res,next) {
    let userID = req.query.userID;
    User.getComments(userID).then(data => {
        res.json(data)
    })
        .catch(err => {
            next(err)
        });

}

function getUserForPassword(req, res,next) {
    let email = req.body.email.toLocaleLowerCase();
    let password=req.body.passowrd
    User.findUserByPassword(email , password).then(data => {
        res.json(data)
    })
        .catch(err => {
            next(err)
        });

}


const updatePassword = async (req , res) => {
    const {email ,userID, oldPassword , newPassword} = req.body
    const  user =  await  User.findUser(email)
    
    if(user == "not exist") return res.json({succes : false , message : "user not found "})
    
   // res.json(user)
    
     const isMatch=  await  bcrypt.compare(oldPassword , user.password)
     const hash = bcrypt.hashSync(newPassword, 10);

    if(!isMatch) return res.json({succes:false , message:"password not match"})

    //res.json({succes:true , message:"password okk"})

    User.updatePassword(email, hash, userID).then(data => {
        res.json(data)
    })
        .catch(err => {
            next(err)
        });
    }


function resetPassword(req, res, next) {
    const hash = bcrypt.hashSync(req.body.password, 10);
    const email=req.body.email
    User.resetPassword(email, hash).then(data => {
        res.json(data)
    })
        .catch(err => {
            next(err)
        });

}
function addComment(req, res, next) {
    let userID = req.query.userID;
    let data = req.body
    User.addComment(userID, data).then(data => {
        let comment = data.comments[data.comments.length - 1]
        res.json(comment)
    })
        .catch(err => {
            next(err)
        });

}

function deleteComment(req, res, next) {
    let userID = req.query.userID;
    let commentID = req.query.commentID

    User.deleteComment(userID, commentID).then(data => {
        res.json(data)
    })
        .catch(err => {
            next(err)
        });

}

  const userSignin = async (req , res) => {
    const {email , password} = req.body
    const  user =  await  User.findUser(email)
    
    if(user == "not exist") return res.json({succes : false , message : "user not found "})
    
   // res.json(user)
    
     const isMatch=  await  bcrypt.compare(password , user.password)
    
    if(!isMatch) return res.json({succes:false , message:"password not match"})
      
    const token = jwt.sign({userID:user._id},process.env.JWT_SECRET )
    
    res.json({succes: true , 
        token:token , 
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        mailAddress:user.mailAddress,
        createdAt:user.createdAt})
    }


module.exports = {
    addUser,
    getUser,
    getPaswword,
    getComments,
    updatePassword,
    getUserForPassword, 
    addComment, 
    deleteComment,
    userSignin, 
    conffirmWithEmail,
    resetPassword,
    checkAndSendCode
};
