import db from "../src/db.js";
import { ObjectId } from "mongodb";

const rezervacijaCollection = db.collection("Rezervacija");
export const getAllRezervacije = async (req, res) => {
  try {
    const rezervacije = await rezervacijaCollection.find().toArray();
    res.json(rezervacije);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getRezervacijaById = async (req, res) => {
  const rezervacijaId = req.params.id;
  try {
    const rezevacija = await rezervacijaCollection.findOne({
      _id: new ObjectId(rezervacijaId),
    });
    if (!rezevacija) {
      return res
        .status(404)
        .json({ message: "Odabrana rezervacija nije pronađena" });
    }
    res.json(rezevacija);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getRezervacijaByGostId = async (req, res) => {
  const gostId = req.params.id;
  try {
    const rezevacija = await rezervacijaCollection
      .find({
        gostId: gostId,
      })
      .toArray();

    if (!rezevacija) {
      return res
        .status(404)
        .json({ message: "Odabrana rezervacija nije pronađena" });
    }
    console.log(rezevacija);
    res.json(rezevacija);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const newRezervacija = async (req, res) => {
  const { gostId, datum, vrijeme, brojStolova, napomena } = req.body;
  try {
    const result = await rezervacijaCollection.insertOne({
      gostId,
      datum,
      vrijeme,
      brojStolova,
      napomena,
    });
    res.status(201).json({
      message: "Rezervacija je uspiješno dodana",
      id: result.insertedId,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const deleteRezervacija = async (req, res) => {
  const rezervacijaId = req.params.id;
  try {
    const result = await rezervacijaCollection.deleteOne({
      _id: new ObjectId(rezervacijaId),
    });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Rezervacija nije pronađena" });
    }
    res.json({ message: "Rezervacija je uspiješno obrisana!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const rezervacijaMethods = {
  getAllRezervacije,
  getRezervacijaById,
  getRezervacijaByGostId,
  newRezervacija,
};
