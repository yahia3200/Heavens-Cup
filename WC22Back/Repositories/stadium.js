const { Pool } = require("pg");
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWARD,
  database: process.env.PSQL_DB,
  connectionLimit: 10
});

module.exports = {
    getStads : async function () {
        try {
            const stads = await pool.query("SELECT * FROM stadiums;");
            return stads.rows;
        } catch (error) {
            throw error;
        }
    },
    insertStad : async function (stad) {
        try {
            const newStad = await pool.query("INSERT INTO stadiums (stad_name, num_rows, seats_per_row) VALUES ($1, $2, $3) RETURNING id;", [stad.stad_name, stad.num_rows, stad.seats_per_row]);
            return newStad.rows;
        } catch (error) {
            throw error;
        }
    }
};

