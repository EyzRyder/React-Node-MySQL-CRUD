require('dotenv').config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
const PORT = 3000;
const db = mysql.createConnection({
    host: process.env.MY_SQL_HOST,
    user: process.env.MY_SQL_USER,
    password: process.env.MY_SQL_PASSWORD,
    database: process.env.MY_SQL_DATABASE
});

app.use(cors());
app.use(express.json());


app.listen(PORT, () => {
    console.log(`listing on port ${PORT}`);
})


app.get('/', (req, res) => {
    res.send('hello world');
})

app.post('/register', (req, res) => {
    const { Fname, Lname, endereco } = req.body;

    let query = `INSERT INTO user (first_name, last_name, address) VALUES(?,?,?)`;

    db.query(query, [Fname, Lname, endereco], (err, result) => {
        if (!err) {
            console.log('Registerd');
        } else {
            console.log(err);
        }
    })
})

app.get('/getTeble', (req, res) => {
    let query = `SELECT * FROM user `;
    db.query(query, (err, result) => {
        if (!err) {
            res.send(result);
        } else {
            console.log(err);
        }
    })
})


app.put("/edit", (req, res) => {
    const { id, Fname, Lname, endereco } = req.body;
    let query = "UPDATE user SET first_name = ?, last_name = ?, address = ? WHERE id = ?";
    db.query(query, [Fname, Lname, endereco, id], (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

app.delete("/delete/:id", (req, res) => {
    const id  = req.params.id;
    console.log(id)
    let query = `DELETE FROM user WHERE id = ${id}`;
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});
