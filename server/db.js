const { Pool } = require("pg");
const pool = new Pool({
    host: "db",
    port: 5432,
    user: "user123",
    password: "qwerty123"
});

module.exports = pool;