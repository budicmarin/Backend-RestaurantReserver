import express from "express";
import db from "./db.js";
import auth from "./auth.js";

const app = express(); // instanciranje aplikacije
const port = 3000; // port na kojem će web server slušati

app.use(express.json());

app.get("/", (req, res) => res.send("Hello World"));

app.post("/gosti", async (req, res) => {
  const gostData = req.body;
  try {
    const gost = await auth.registerGost(gostData);
    res.status(200).json({ message: "Registracija uspješna." });
  } catch (error) {
    res.status(500).json({ error: "Niste se uspjeli registrirati." });
  }
});

app.post("/registracija", (req, res) => {
  res.status(201).send({ message: "OK" });
});

app.get("/gost", (req, res) => {
  res.json([{}]);
});

app.get("/gost/:gostId", (req, res) => {
    res.json([{ gostId:5 }]);
  });

app.listen(port, () => console.log(`Slušam na portu ${port}!`));
