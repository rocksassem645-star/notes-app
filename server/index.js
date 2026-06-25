const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "notes-app",
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed:", err);
    return;
  }
  console.log("Connected to database!");
});

app.get("/", (req, res) => {
  res.send("Server is working!");
});

app.get("/notes", (req, res) => {
  db.query("SELECT * FROM notes", (err, results) => {
    if (err) {
      res.status(500).send("Error retrieving notes");
      return;
    }
    res.json(results);
  });
});

app.post("/notes", (req, res) => {
  const { title, body } = req.body;
  db.query(
    "INSERT INTO notes (title, body) VALUES (?, ?)",
    [title, body],
    (err, results) => {
      if (err) {
        res.status(500).send("Error saving note");
        return;
      }
      res.json({ message: "Note saved!", id: results.insertId });
    },
  );
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
