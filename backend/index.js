const express = require("express");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const bodyParser = require("body-parser");
const connection = require("./db.js");
const webRoutes = require("./routes/web.js");
const bcrypt = require("bcrypt");

// membuat instance express
const app = express();
const port = 3001;

// handler untuk parsing data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/web", webRoutes);

const storage = multer();

// SECRET KEY untuk JWT
const SECRET_KEY = "SECRET_KEY";

// Route Login
app.post("/web/auth/login", async (req, res) => {
  const { id, password } = req.body;

  try {
    const [rows] = await connection.query(
      "SELECT * FROM tbl_users WHERE id = ? AND password = ?",
      [id, password]
    );

    if (rows.length > 0) {
      const user = rows[0];
      // Generate token dengan payload user.id dan user.name
      const token = jwt.sign({ id: user.id, name: user.name }, SECRET_KEY, {
        expiresIn: "1h",
      });
      res.json({ token, id: user.id });
    } else {
      res.status(401).json({ message: "ID atau Password salah" });
    }
  } catch (error) {
    console.error("Login Error", error);
    res.status(500).send("Error saat login");
  }
});

// Route Get User Details
app.get("/web/auth/user", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const user = jwt.verify(token, SECRET_KEY);
    res.json({ id: user.id, name: user.name });
  } catch (err) {
    res.status(401).json({ message: "Token tidak valid" });
  }
});

app.post("/web/auth/login", async (req, res) => {
  const { id, password } = req.body;
  try {
    const [rows] = await connection.query(
      "SELECT * FROM tbl_users WHERE id = ?",
      [id]
    );

    if (rows.length > 0) {
      const user = rows[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = jwt.sign({ id: user.id, name: user.name }, "SECRET_KEY", {
          expiresIn: "1h",
        });
        res.json({ token, id: user.id });
      } else {
        res.status(401).send("ID atau password salah");
      }
    } else {
      res.status(401).send("ID atau password salah");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Terjadi kesalahan pada server");
  }
});

// jalankan server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
