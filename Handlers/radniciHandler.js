import db from "../src/db.js";
import { ObjectId } from "mongodb";

const radniciCollection = db.collection("Radnici");

// Ispisivanje svih radnika
export const getAllRadnici = async (req, res) => {
  try {
    const radnici = await radniciCollection.find().toArray();
    res.json(radnici);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Traženje samo jednog radnika po ID-u
export const getRadnikById = async (req, res) => {
  const radnikId = req.params.id;

  try {
    const radnik = await radniciCollection.findOne({ id: radnikId });
    if (!radnik) {
      return res
        .status(404)
        .json({ message: "Odabrani radnik nije pronađen." });
    }
    res.json(radnik);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//Pronalaženje  Radnika po Emailu

export const getRadnikByEmail = async (req, res) => {
  const radnikEmail = req.params.email;

  try {
    const radnik = await radniciCollection.findOne({ email: radnikEmail });
    if (!radnik) {
      return res
        .status(404)
        .json({ message: "Odabrani radnik nije pronađen." });
    }
    res.json(radnik);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Dodavanje novog radnika
export const newRadnik = async (req, res) => {
  const { id, ime, prezime, godiste, role } = req.body;
  try {
    const result = await radniciCollection.insertOne({
      id,
      ime,
      prezime,
      godiste,
      role,
    });
    res
      .status(201)
      .json({ message: "Radnik je uspješno dodan.", id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Brisanje samo jednog radnika
export const deleteRadnik = async (req, res) => {
  const radnikId = req.params.id;
  try {
    const result = await radniciCollection.deleteOne({
      id: radnikId,
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Radnik nije pronađen." });
    }

    res.json({ message: "Radnik je uspješno obrisan!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const radniciMethods = {
  getAllRadnici,
  getRadnikById,
  getRadnikByEmail,
  newRadnik,
  deleteRadnik,
};
