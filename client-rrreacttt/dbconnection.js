const { Client } = require("pg");


const client = new Client({
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "123",

});

module.exports = client;