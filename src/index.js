import express from "express";
import db from "./db.js";
import auth from "./auth.js";
import { radniciMethods } from "../Handlers/radniciHandler.js";
import { gostiMethods } from "../Handlers/gostiHandler.js";
import { ocjeneMethods } from "../Handlers/ocjeneHandler.js";
import { piceMethods } from "../Handlers/piceHandler.js";
const gostiCollection = db.collection("Gosti");
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

    return res.json({ token: result.token });
  } catch (error) {
    return res.status(403).json({ error: error.message });
  }
});

app.post("/gosti", async (req, res) => {
  let gostData = req.body;

  try {
    await auth.registerGost(gostData);
    res.status(201).json({ message: "Gost je uspješno dodan." });
  } catch (e) {
    if (e.message === "Email already exists") {
      res.status(409).json({ error: e.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});
/*
app.post("/changePass", async (req, res) => {
  let gostEmail = req.body.email;
  let gostNewPassword = req.body.password;
  try {
    let gostData = gostiCollection.findOne({ email: gostEmail });
    if (!userData) {
      return res.status(404).json({ message: "User not found." });
    }
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password in the database
    await gostiCollection.updateOne(
      { email: gostEmail },
      { $set: { password: hashedNewPassword } }
    );
  } catch (error) {}
});*/

app.post("/changePass", async (req, res) => {
  let gostEmail = req.body.email;
  let gostNewPassword = req.body.password;
  try {
    await auth.changePass(gostEmail, gostNewPassword);

    return res.status(200).json({ message: "Password changed successfully." });
  } catch (error) {
    console.error("Error changing password:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

// Pozivanje nekih osnovnih operacija radi provjere konekcije
// sa MongomDB

app.get("/radnici", radniciMethods.getAllRadnici);
app.get("/radnici/id/:id", radniciMethods.getRadnikById);
app.get("/radnici/email/:email", radniciMethods.getRadnikByEmail);
app.post("/radnici", radniciMethods.newRadnik);
app.delete("/radnici/:id", radniciMethods.deleteRadnik);
app.put("/radnici", radniciMethods.updateRadnik);

app.get("/gosti", gostiMethods.getAllGosti);
app.get("/gosti/id/:id", gostiMethods.getGostById);
app.get("/gosti/email/:email", gostiMethods.getGostByEmail);
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
