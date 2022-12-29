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
  insertUser: async function (body) {
    try {
      const users = await pool.query(
        "INSERT INTO users (fname, lname, username, email, userrole, gender, birthdate, nationality, hash, approved) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id;",
        [
          body.fname,
          body.lname,
          body.username,
          body.email,
          body.userrole,
          body.gender,
          body.birthdate,
          body.nationality,
          body.hash,
          false
        ]);
        console.log(users.rows[0]);
        return users.rows[0];
    } catch (error) {
      throw error;
    } 
  },
  getUser: async function (username) {
    try {
      const users = await pool.query("SELECT * FROM users WHERE username = $1;", [username]);
      return users.rows[0];
    } catch (error) {
      throw error;
    }
  },
  updateUser : async function (body) {
    try {
      const users = await pool.query(`
      UPDATE users SET fname = $1, lname = $2, email = $3, gender = $4, birthdate = $5, nationality = $6, hash = $7 WHERE username = $8 RETURNING id;`
      , [body.fname, body.lname, body.email, body.gender, body.birthdate, body.nationality, body.hash, body.username]);
      return users.rows[0];
    } catch (error) {
      throw error;
    }
  },
  approveUser : async function (username) {
    try {
      const users = await pool.query("UPDATE users SET approved = true WHERE username = $1 RETURNING id;", [username]);
      return users.rows[0];
    } catch (error) {
      throw error;
    }
  },
  deleteUser : async function (username) {
    try {
      const users = await pool.query("DELETE FROM users WHERE username = $1 RETURNING id;", [username]);
      return users.rows[0];
    } catch (error) {
      throw error;
    }
  }
};