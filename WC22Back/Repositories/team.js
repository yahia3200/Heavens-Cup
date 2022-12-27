const { createPool } = require("pg");
const pool = createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWARD,
  database: process.env.PSQL_DB,
  connectionLimit: 10
});


module.exports = {
    getTeams : async function () {
        try {
            const teams = await pool.query("SELECT * FROM teams");
            return teams;
        } catch (error) {
            throw error;
        } finally {
            pool.end();
        }
    }
};
