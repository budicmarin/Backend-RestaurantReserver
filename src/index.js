import express from "express";
import db from "./db.js";
import auth from "./auth.js";
import { radniciMethods } from "../Handlers/radniciHandler.js";
import { gostiMethods } from "../Handlers/gostiHandler.js";
import { ocjeneMethods } from "../Handlers/ocjeneHandler.js";
import { piceMethods } from "../Handlers/piceHandler.js";

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

app.get("/gost/:id", (req, res) => {
  res.json([{ id: 5 }]);
});

app.post("/auth", async (req, res) => {
  let gost = req.body;
  let email = gost.email;
  let password = gost.password;

  try {
    let result = await auth.authenticateGost(email, password);
    res.status(201).json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/gost", async (req, res) => {
  let gost = req.body;

  try {
    let result = await auth.registerGost(gost);
    res.status(201).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Pozivanje nekih osnovnih operacija radi provjere konekcije
// sa MongomDB

app.get("/radnici", radniciMethods.getAllRadnici);
app.get("/radnici/:id", radniciMethods.getRadnikById);
app.post("/radnici", radniciMethods.newRadnik);
app.delete("/radnici/:id", radniciMethods.deleteRadnik);

app.get("/gosti", gostiMethods.getAllGosti);
app.get("/gosti/:id", gostiMethods.getGostById);
//app.post("/gosti", gostiMethods.newGost);
app.delete("/gosti/:id", gostiMethods.deleteGost);

app.get("/ocjene", ocjeneMethods.getAllOcjene);
app.get("/ocjene/:id", ocjeneMethods.getOcjenaById);
app.post("/ocjene", ocjeneMethods.newOcjena);
app.delete("/ocjene/:id", ocjeneMethods.deleteOcjena);

app.get("/pice", piceMethods.getAllPica);
app.get("/pice/:id", piceMethods.getPiceById);
app.post("/pice", piceMethods.newPice);
app.delete("/pice/:id", piceMethods.deletePice);

app.listen(port, () => console.log(`Slušam na portu ${port}!`));
