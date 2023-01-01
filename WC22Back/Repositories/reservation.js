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
    insertReservation : async function (body) {
        try {
            console.log(body);
            const reservations = await pool.query(
                "INSERT INTO reservations (chair_id, match_id, user_id) VALUES ($1,$2,$3);",
                [
                    body.chair_id,
                    body.match_id,
                    body.user_id
                ]);
                return reservations.rows[0];
        } catch (error) {
            throw error;
        }
    },
    getCustomerReservations : async function (user_id) {
        try {
            const reservations = await pool.query(
                "SELECT * FROM reservations WHERE user_id = $1;",
                [
                    user_id
                ]);
                return reservations.rows;
        } catch (error) {
            throw error;
        }
    },
    getMatchReservations : async function (match_id) {
        try {
            const reservations = await pool.query(
                "SELECT * FROM reservations WHERE match_id = $1;",
                [
                    match_id
                ]);
                return reservations.rows;
        } catch (error) {
            throw error;
        }
    },
    deleteReservation : async function ( chair_id, match_id) {
        try {
            const reservations = await pool.query("DELETE FROM reservations WHERE chair_id = $1 AND match_id = $2;", [chair_id, match_id]);
            return true;
        } catch (error) {
            throw error;
        }
    }
};