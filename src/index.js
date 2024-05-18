const mysql = require('mysql');
const express = require("express");


const app = express();

app.listen(8080, () => {
    console.log(">>> ESCUCHANDO PUERTO EN EL 8080 <<<")
});


app.get("/", (req, res) => {
    res.send("HELLO WORLD!!!");
});

app.get("/bye", (req, res) => {
    res.send("Good Bye!!!");
});

