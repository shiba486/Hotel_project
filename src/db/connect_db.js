const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;
// const URI = "mongodb://localhost:27017/todo_database";

//method-1
// const database_connection = async function(){
//     try {
//         const DB_Instance = await mongoose.connect(URI);
//         console.log(`database connection successfull at DB host: ${DB_Instance.connection.host} `)
//     } catch (error) {
//         console.log(`database connection failed`);
//         process.exit(1)
//     }
// }

// module.exports = database_connection;


//method-2
mongoose.connect(URI)
const db = mongoose.connection;
//  Define event listener for database connection
db.on("connected",()=>{
    console.log("connected to mongodb server")
  });
  db.on("error",(err)=>{
    console.log(" mongodb connection error")
  });
  db.on("disconnected",()=>{
    console.log("mongodb server disconnected")
  });

  module.exports = db;
