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
    getReferees : async function (role) {
        try {
            const referees = await pool.query("SELECT * FROM referees WHERE ref_role = $1;", [role]);
            return referees.rows;
        } catch (error) {
            throw error;
        }
    }
};