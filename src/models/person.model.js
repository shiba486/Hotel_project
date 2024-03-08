const bcrypt = require("bcrypt")
const mongoose = require("mongoose");

const PersonSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    work: {
        type: String,
        enum: ["chef", "waiter", "manager"],
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true,
    },

},{timestamps:true, versionKey:false});

PersonSchema.pre("save", async function(next){
    try {
        const person = this;
        if(!person.isModified("password")) return next();
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(person.password, salt);
         person.password = hashedPassword;
         next()
    } catch (error) {
        return next(error)
    }
})

PersonSchema.methods.comparePassword = async function(candidatePassword){
        
        // console.log(this.password)
    try {
        
        const isMatch = await bcrypt.compare(candidatePassword,this.password)
        return isMatch;
    } catch (err) {
        throw err
    }
}
const Person = mongoose.model("Person",PersonSchema);



module.exports =Person