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
            INSERT INTO matches (team1, team2, start_time, main_ref, line_man_1, line_man_2, stad_id) VALUES (?,?,?,?,?,?,?) RETURNING id`
            , [body.team1, body.team2, body.start_time, body.main_ref, body.line_man_1, body.line_man_2, body.stad_id]);
            return matches[0];
        } catch (error) {
            throw error;
        } finally {
            pool.end();
        }
    },
    updateMatch : async function (body) {
        try {
            const matches = await pool.query(`
            UPDATE matches SET team1 = ?, team2 = ?, start_time = ?, main_ref = ?, line_man_1 = ?, line_man_2 = ?, stad_id = ? WHERE id = ? RETURNING id`
            , [body.team1, body.team2, body.start_time, body.main_ref, body.line_man_1, body.line_man_2, body.stad_id, body.id]);
            return matches[0];
        } catch (error) {
            throw error;
        } finally {
            pool.end();
        }
    },
    getMatches : async function () {
        try {
            const matches = await pool.query("SELECT * FROM matches");
            return matches;
        } catch (error) {
            throw error;
        } finally {
            pool.end();
        }
    },
    getMatch : async function (id) {
        try {
            const matches = await pool.query("SELECT * FROM matches WHERE id = ?", [id]);
            return matches[0];
        } catch (error) {
            throw error;
        } finally {
            pool.end();
        }
    }
};