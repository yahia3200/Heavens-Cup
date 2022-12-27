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
    insertReservation : async function (body) {
        try {
            const reservations = await pool.query(
                "INSERT INTO reservations (chair_id, match_id, user_id) VALUES (?,?,?) RETURNING id",
                [
                    body.chair_id,
                    body.match_id,
                    body.user_id
                ]);
                return reservations[0];
        } catch (error) {
            throw error;
        } finally {
            pool.end();
        }
    },
    deleteReservation : async function ( chair_id, match_id) {
        try {
            const reservations = await pool.query("DELETE FROM reservations WHERE chair_id = ? AND match_id = ?", [chair_id, match_id]);
            return reservations[0];
        } catch (error) {
            throw error;
        } finally {
            pool.end();
        }
    }
};