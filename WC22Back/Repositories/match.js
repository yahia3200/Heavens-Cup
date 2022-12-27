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
    insertMatch : async function (body) {
        try {
            const matches = await pool.query(`
            INSERT INTO matches (team1, team2, start_time, main_ref, line_man_1, line_man_2, stad_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;`
            , [body.team1, body.team2, body.start_time, body.main_ref, body.line_man_1, body.line_man_2, body.stad_id]);
            return matches.rows[0];
        } catch (error) {
            throw error;
        }
    },
    updateMatch : async function (body) {
        try {
            const matches = await pool.query(`
            UPDATE matches SET team1 = $1, team2 = $2, start_time = $3, main_ref = $4, line_man_1 = $5, line_man_2 = $6, stad_id = $7 WHERE id = $8 RETURNING id;`
            , [body.team1, body.team2, body.start_time, body.main_ref, body.line_man_1, body.line_man_2, body.stad_id, body.id]);
            return matches.rows[0];
        } catch (error) {
            throw error;
        }
    },
    getMatches : async function () {
        try {
            const matches = await pool.query("SELECT * FROM matches;");
            return matches.rows;
        } catch (error) {
            throw error;
        }
    },
    getMatch : async function (id) {
        try {
            const matches = await pool.query("SELECT * FROM matches WHERE id = $1;", [id]);
            return matches.rows[0];
        } catch (error) {
            throw error;
        }
    }
};