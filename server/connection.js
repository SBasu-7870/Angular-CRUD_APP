const mysql = require("mysql");


const db = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"password",
    database:"angular"
})


db.connect((err)=>{
    if (err) {
        console.error('Error establishing MY SQL connection:', err);
        return;
      }

    console.log("Database connection created");
})

module.exports.db = db;