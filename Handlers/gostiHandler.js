import db from "../src/db.js";
import { ObjectId } from "mongodb";

const gostiCollection = db.collection("Gosti");

// Ispisivanje svih gostiju
export const getAllGosti = async (req, res) => {
  try {
    const gosti = await gostiCollection.find().toArray();
    res.json(gosti);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Traženje samo jednog gosta
export const getGostById = async (req, res) => {
  const gostId = req.params.id;

  try {
    const gost = await gostiCollection.findOne({ _id: new ObjectId(gostId) });
    if (!gost) {
      return res.status(404).json({ message: "Odabrani gost nije pronađen." });
    }
    res.json(gost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//Traženje gosta pomoću Emaila
export const getGostByEmail = async (req, res) => {
  const gostEmail = req.params.email;
  try {
    const gost = await gostiCollection.findOne({ email: gostEmail });
    if (!gost) {
      return res.status(404).json({ message: "Odabrani gost nije pronađen." });
    }
    res.json(gost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Dodavanje novog gosta
export const newGost = async (req, res) => {
  const { id, ime, prezime, godiste, broj_telefona } = req.body;
  try {
    const result = await gostiCollection.insertOne({
      id,
      ime,
      prezime,
      godiste,
      broj_telefona,
    });
    res
      .status(201)
      .json({ message: "Gost je uspješno dodan.", id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Brisanje samo jednog gosta
export const deleteGost = async (req, res) => {
  const gostId = req.params.id;
  try {
    const result = await gostiCollection.deleteOne({
      id: gostId,
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Gost nije pronađen." });
    }

    res.json({ message: "Gost je uspješno obrisan!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const gostiMethods = {
  getAllGosti,
  getGostById,
  getGostByEmail,
  newGost,
  deleteGost,
};
