const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy
const Person = require("../models/person.model")


passport.use(LocalStrategy(async function(USERNAME,password,done){
    try {
        console.log("Received Credential", USERNAME,password);
        const user = await Person.findOne({username: USERNAME});
        if(!user){
            return done(null, false, {message: "Incorrect username"})
        }
        const isPasswordMatch = user.password ===password ? true : false;
        if(isPasswordMatch){
            return done(null,user)
        }else{
            return done(null, false, {message: "incorrect password"})
        }
    } catch (error) {
        return done(error)
    }
}))

module.exports = passport