const Jwt = require("jsonwebtoken");

exports.createToken = async function (payload){
    const secretKey = process.env.TOKEN_SECRET_KEY
   return  await Jwt.sign(payload, secretKey)
   
}