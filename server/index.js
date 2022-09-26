const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    port: 3312,
    password: 'raizV2toorU2',
    database: 'nossobanco',
});

app.post('/create', (req, res) => { 
    const nome = req.body.nome;
    const sobrenome = req.body.sobreNome;
    const endereco = req.body.endereco;

    db.query(
        'INSERT INTO user (id, first_name, last_name,address) VALUES (?,?,?,?)',
        ["null",nome, sobrenome, endereco],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values inserted");
            }
        });
})

app.get('/pessoas', (req, res) => { 
    db.query('SELECT * FROM user',
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
})

app.listen(3001, () => {
    console.log('listening on 3001');
});