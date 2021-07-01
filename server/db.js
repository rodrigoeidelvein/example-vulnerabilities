const { Pool } = require("pg");

const pool = new Pool({
    connectionString: "postgres://postgres:admin@localhost:5432/seguranca",
});

module.exports = {
    query: (text, params) => {
        return pool.query(text, params);
    },
};
