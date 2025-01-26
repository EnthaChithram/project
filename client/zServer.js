const client = require("./dbconnection.js");
const express = require("express");
const app = express();

const cors = require('cors');

app.use(cors());

const corsOptions = {
    origin: '*', // Allow requests from all origins
};

app.use(cors(corsOptions));


app.listen(3300, () => {
    console.log("listeningg");
})

client.connect();


app.get("/cars", (req, res) => {
    client.query("SELECT * FROM CARS", (err, result) => {
        res.send(result.rows);
    })
    client.end;
})