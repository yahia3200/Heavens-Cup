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
        "INSERT INTO users (fname, lname, username, email, userrole, gender, birthdate, nationality, hash) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id;",
        [
          body.fname,
          body.lname,
          body.username,
          body.email,
          body.userrole,
          body.gender,
          body.birthdate,
          body.nationality,
          body.hash
        ]);
        console.log(users.rows[0]);
        return users.rows[0];
    } catch (error) {
      throw error;
    } 
  },
  getUser: async function (username) {
    try {
      const users = await pool.query("SELECT * FROM users WHERE username = ?;", [username]);
      return users[0];
    } catch (error) {
      throw error;
    } finally {
      pool.end();
    }
  },
  updateUser : async function (body) {
    try {
      const users = await pool.query(`
      UPDATE users SET fname = ?, lname = ?, email = ?, gender = ?, birthdate = ?, nationality = ?, nationality = ? WHERE username = ? RETURNING id`
      , [body.fname, body.lname, body.email, body.gender, body.birthdate, body.nationality, body.username]);
      return users[0];
    } catch (error) {
      throw error;
    } finally {
      pool.end();
    }
  },
  deleteUser : async function (username) {
    try {
      const users = await pool.query("DELETE FROM users WHERE username = ? RETURNING id", [username]);
      return users[0];
    } catch (error) {
      throw error;
    }
  }
};