import express from "express";
import db from "../db/connection.js";
import { radniciMethods } from "../controllers/radniciController.js";
import { gostiMethods } from "../controllers/gostiController.js";
import { ocjeneMethods } from "../controllers/ocjeneController.js";
import { piceMethods } from "../controllers/piceController.js";

const app = express(); // instanciranje aplikacije
const port = 3000; // port na kojem će web server slušati

app.use(express.json());

app.get("/", (req, res) => res.send("Hello World"));

// Pozivanje nekih osnovnih operacija radi provjere konekcije
// sa MongomDB

app.get("/radnici", radniciMethods.getAllRadnici);
app.get("/radnici/:id", radniciMethods.getRadnikById);
app.post("/radnici", radniciMethods.newRadnik);
app.delete("/radnici/:id", radniciMethods.deleteRadnik);

app.get("/gosti", gostiMethods.getAllGosti);
app.get("/gosti/:id", gostiMethods.getGostById);
app.post("/gosti", gostiMethods.newGost);
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
