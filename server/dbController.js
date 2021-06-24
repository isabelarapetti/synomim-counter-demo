const express = require("express");
const mysql = require("mysql");
const app = express();

const connection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "password",
  database: process.env.MYSQL_DATABASE || "test",
});

// const selectDB = function () {
//   connection.query("SELECT * FROM Activity", (err, rows) => {
//     if (err) {
//       res.json({
//         success: false,
//         err,
//       });
//     } else {
//       res.json({
//         success: true,
//         rows,
//       });
//     }
//   });
// };
