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
    getReferees : async function () {
        try {
            const referees = await pool.query("SELECT * FROM referee;");
            return referees.rows;
        } catch (error) {
            throw error;
        }
    }
};