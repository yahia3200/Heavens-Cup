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
            UPDATE matches SET start_time = $1, main_ref = $2, line_man_1 = $3, line_man_2 = $4, stad_id = $5 WHERE id = '$6' RETURNING id;`
            , [body.start_time, body.main_ref, body.line_man_1, body.line_man_2, body.stad_id, body.id]);
            return matches.rows[0];
        } catch (error) {
            throw error;
        }
    },
    getMatches : async function () {
        try {
            const matches = await pool.query(`SELECT  matches.*, team1.team_name AS team1_name, 
            team2.team_name AS team2_name, stadiums.stad_name
            FROM matches
            INNER JOIN teams AS team1 ON matches.team1 = team1.id
            INNER JOIN teams AS team2 ON matches.team2 = team2.id
            INNER JOIN stadiums ON matches.stad_id = stadiums.id;
            `);
            return matches.rows;
        } catch (error) {
            throw error;
        }
    },
    getMatch : async function (id) {
        try {
            const matches = await pool.query(`SELECT  matches.id, matches.start_time , 
            team1.team_name AS team1_name, team2.team_name AS team2_name, 
            stadiums.stad_name, stadiums.num_rows, stadiums.seats_per_row,
            main_referee.ref_name AS main_ref, lineman1.ref_name AS line_man_1, lineman2.ref_name AS line_man_2
            FROM matches
            INNER JOIN teams AS team1 ON matches.team1 = team1.id
            INNER JOIN teams AS team2 ON matches.team2 = team2.id
            INNER JOIN stadiums ON matches.stad_id = stadiums.id
            INNER JOIN referee AS main_referee ON matches.main_ref = main_referee.id
            INNER JOIN referee AS lineman1 ON matches.line_man_1 = lineman1.id
            INNER JOIN referee AS lineman2 ON matches.line_man_2 = lineman2.id
            WHERE matches.id = '$1';
            `, [id]);
            return matches.rows[0];
        } catch (error) {
            throw error;
        }
    }
};