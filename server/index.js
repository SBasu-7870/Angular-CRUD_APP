const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require("./connection").db;


const app = express();
app.use(cors());
app.use(bodyParser.json());


app.get("/createdb",(req,res)=>{
    
    let qry = "CREATE DATABASE angular";

    db.query(qry,(err)=>{
        if (err) {
            console.error('Error:', err);
            return res.status(500).json({ error: 'error creating the database' });
        }

        res.send("Database Created");
    })
});

app.get("/closedb",(req,res)=>{

    db.end((err) => {
        if (err) {
          console.error('Error:', err);
          return res.status(500).json({ error: 'error closing the database connection' });
        }
        res.send("Database connection terminated successfully");
    })
})


app.post("/createemployee",(req,res)=>{
    let qry = "CREATE TABLE employee(id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL,email VARCHAR(255) NOT NULL, designation VARCHAR(255) NOT NULL, PRIMARY KEY(id))";

    db.query(qry, (err) => {

        if (err) {
            console.error('Error:', err);
            return res.status(500).json({ error: 'Error creating the table' });
          }
    
        res.send("Employee table created");
    
    });
})


app.post("/employees",(req,res)=>{
    const {name,email,designation} = req.body;

    db.query("INSERT INTO employee (name,email,designation) VALUES (?,?,?)",[name,email,designation], (error,res) => {
        if (error) {
            console.error('Error creating employee record:', error);
            res.status(500).json({ error });
            return;
        }
        res.json({ id: result.insertId });
    });
});

app.put('/employees/:id', (req, res) => {
    const { name, email, designation} = req.body;
    const { id } = req.params;
  
    connection.query(
      'UPDATE employees SET name = ?, email = ?, designation = ? WHERE id = ?',
      [name, email, designation, id],
      (error) => {
        if (error) {
          console.error('Error updating employee record:', error);
          res.status(500).json({ error });
          return;
        }
        res.json({ success: true });
      }
    );
  });

app.listen(5000,(err) => {
    if (err) {
        console.error('Error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }

    console.log("Server running at port 5000!");
})

