import express from "express";
import { newRadnik, radniciMethods } from "../controllers/radniciController.js";
import db from "../db/connection.js";

const app = express(); // instanciranje aplikacije
const port = 3000; // port na kojem će web server slušati

app.use(express.json());

app.get("/", (req, res) => res.send("Hello World"));

// Pozivanje nekih osnovnih operacija radi provjere konekcije
// sa MongomDB

// Dohvaćanje svih radnika
app.get("/radnici", radniciMethods.getAllRadnici);

// Dohvaćanje samo jednog radnika po ID-u
app.get("/radnici/:id", radniciMethods.getRadnikById);

// Dodavanje novog radnika
app.post("/radnici", newRadnik);

app.listen(port, () => console.log(`Slušam na portu ${port}!`));
