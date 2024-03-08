
const Jwt = require("jsonwebtoken")
exports.authToken = async function(req,res,next){
   try {
    const accessToken = req.headers["token_key"];
    const secretKey = process.env.TOKEN_SECRET_KEY
    const decodeToken =  await Jwt.verify(accessToken,secretKey);
        console.log(decodeToken)
        const {email} = decodeToken
        req.headers["email"] =email
        next()

   } catch (error) {
    res.status(404).json({status: "error", message: "authorization faild"});
        console.log(error)
   }
}


exports.jwtAuthMiddle = async function(req,res,next){
    try {
        const token = req.headers.authorization.split(" ")[1];
        if(!token){
            return res.status(404).json({status: "sorry", message: "token not found"});
        }
        const authToken = Jwt.verify(token, process.env.TOKEN_SECRET_KEY) 
        console.log(authToken)
        const {email} = authToken
        req.headers["email"] =email
        next()
    } catch (error) {
        res.status(404).json({status: "error", message: "authorization faild"});
        console.log(error)
    }
}