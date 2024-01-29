const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.json());
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "drivesoft-angular",
});
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
connection.connect((err) => {
  if (err) {
    console.error("Greška pri povezivanju sa bazom: " + err.stack);
    return;
  }
  console.log("Povezani ste sa bazom podataka.");
});

// Login Endpoint
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Pretraga korisnika po emailu
  const query = "SELECT * FROM users WHERE email = ?";
  connection.query(query, [email], (err, results) => {
    if (err) {
      res.status(500).send({ message: "Greška na serveru." });
      return;
    }

    if (results.length > 0) {
      // Korisnik pronađen, uporedite lozinke
      bcrypt.compare(password, results[0].password, (error, isMatch) => {
        if (error) {
          res.status(500).send({ message: "Greška pri proveri lozinke." });
          return;
        }

        if (isMatch) {
          // Generišite JWT token
          const token = jwt.sign(
            { userId: results[0].id, email: results[0].email },
            "tajniKljuc", // Ovo bi trebalo da bude tajni ključ
            { expiresIn: "1h" } // Token ističe za 1 sat
          );

          res.json({
            message: "Login successful",
            user: results[0],
            token: token,
          });
        } else {
          // Lozinke se ne poklapaju
          res.status(401).send({ message: "Neispravni kredencijali." });
        }
      });
    } else {
      // Korisnik nije pronađen
      res.status(404).send({ message: "Korisnik nije pronađen." });
    }
  });
});

app.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  // Hashiranje lozinke
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      res.status(500).send({ message: "Greška pri hashiranju lozinke." });
      return;
    }

    const query =
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    connection.query(query, [username, email, hash], (err, results) => {
      if (err) {
        res.status(500).send({ message: "Greška pri registraciji korisnika." });
        return;
      }

      // Generišite JWT token
      const token = jwt.sign(
        {
          userId: results.insertId,
          email: email,
          role: "user",
        },
        "tajniKljuc", // Tajni ključ za potpisivanje tokena
        { expiresIn: "1h" }
      );

      res
        .status(201)
        .send({ message: "Korisnik uspešno registrovan.", token: token });
    });
  });
});

app.get("/getComponents", (req, res) => {
  const query = "SELECT * FROM components";
  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).send({ message: "Greška na serveru pri dohvatanju komponenti.", error: err });
      return;
    }
    res.json({ message: "Sve komponente", data: results });
  });
});

app.get("/getComponent/:id", (req, res) => {
  const componentId = req.params.id;
  const query = "SELECT * FROM components WHERE id = ?";
  connection.query(query, [componentId], (err, results) => {
    if (err) {
      res.status(500).send({ message: "Greška na serveru pri dohvatanju komponente.", error: err });
      return;
    }
    if (results.length > 0) {
      res.json({ message: "Komponenta pronađena.", data: results[0] });
    } else {
      res.status(404).send({ message: "Komponenta nije pronađena." });
    }
  });
});

app.post('/addComponent', (req, res) => {
  const { componentName, description, price } = req.body;

  if (!componentName || !price) {
    return res.status(400).send({ message: "Naziv komponente i cena su obavezni." });
  }

  const query = "INSERT INTO components (componentName, description, price) VALUES (?, ?, ?)";
  connection.query(query, [componentName, description, price], (err, results) => {
    if (err) {
      return res.status(500).send({ message: "Greška pri dodavanju komponente.", error: err });
    }
    res.status(201).send({ message: "Komponenta uspešno dodata.", componentId: results.insertId });
  });
});


app.put("/editComponent/:id", (req, res) => {
  const componentId = req.params.id;
  const { componentName, description, price, image } = req.body;
  const query = "UPDATE components SET componentName = ?, description = ?, price = ?, image = ? WHERE id = ?";
  connection.query(query, [componentName, description, price, image, componentId], (err, results) => {
    if (err) {
      res.status(500).send({ message: "Greška pri izmeni komponente.", error: err });
      return;
    }
    res.send({ message: "Komponenta uspešno izmenjena." });
  });
});

app.delete("/deleteComponent/:id", (req, res) => {
  const componentId = req.params.id;
  const query = "DELETE FROM components WHERE id = ?";
  connection.query(query, [componentId], (err, results) => {
    if (err) {
      res.status(500).send({ message: "Greška pri brisanju komponente.", error: err });
      return;
    }
    res.send({ message: "Komponenta uspešno obrisana." });
  });
});


// Pokretanje servera
app.listen(port, () => {
  // console.log(Server pokrenut na portu ${port});
});