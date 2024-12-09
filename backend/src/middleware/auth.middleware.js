import jwt from 'jsonwebtoken'

export default  authenticatejwt = async (req, res, next)=>{
 try{
  const token = req.cookies.token;
  if(!token){
    return res.status(401).json({
      message: "User not Authenticated"
    })
  }
  const decode = await jwt.verify(token, process.env.JWT_SECRET);
  if(!decode){
    return res.status(401).json({
      message:"Invalid Token"
    })
  }
  //this has to be fix
  req.id = decode.userId;
  next();
 }
 catch(error){
  console.log(error)
 }
}

