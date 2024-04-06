import express from "express";
import db from "./db.js";
import auth from "./auth.js";
import { radniciMethods } from "../Handlers/radniciHandler.js";
import { gostiMethods } from "../Handlers/gostiHandler.js";
import { ocjeneMethods } from "../Handlers/ocjeneHandler.js";
import { piceMethods } from "../Handlers/piceHandler.js";
import cors from "cors";
import dotenv from "dotenv";

const app = express(); // instanciranje aplikacije
const port = 3000; // port na kojem će web server slušati

app.use(express.json());
app.use(cors());
dotenv.config();

app.get("/tajna", [auth.verify], (req, res) => {
  res.json({ message: "Ovo je tajna " + req.jwt.email });
});

app.get("/tajna", (res, req) => {
  res.json({ message: "Tajna" + req.jwt.email });
});

app.post("/auth", async (req, res) => {
  let gostData = req.body;
  try {
    const result = await auth.authenticateGost(
      gostData.email,
      gostData.password
    );
    return res.json(result);
    return res.json({ token: result.token });
  } catch (error) {
    return res.status(403).json({ error: error.message });
  }
});

app.post("/gosti", async (req, res) => {
  let gostData = req.body;

  try {
    let result = await auth.registerGost(gostData);
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: "Email već postoji." });
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
