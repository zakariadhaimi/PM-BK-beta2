const jwt= require('jsonwebtoken')

exports.isAuth= async (req,res , next)=>{
    let userID = req.body.userID
    if (userID===undefined ) userID=req.query.userID
   

    const decode = await jwt.verify(req.headers.authorization, process.env.JWT_SECRET)

 if(decode.userID != userID) return  res.send("not correct token")
 
 next()
 
}