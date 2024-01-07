import db from "../db/connection.js";

const piceCollection = db.collection("Pice");

// Ispis svih pića
export const getAllPica = async (req, res) => {
  try {
    const pice = await piceCollection.find().toArray();
    res.json(pice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Ispis samo jednog pića po ID-u
export const getPiceById = async (req, res) => {
  const piceId = req.params.id;
  try {
    const pice = await piceCollection.findOne({ id: piceId });
    if (!pice) {
      res.status(404).json({ message: "Odabrano piće nije pronađeno." });
    }
    res.json(pice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Dodavanje novog pića
export const newPice = async (req, res) => {
  const { id, nazivPica } = req.body;
  try {
    const result = await piceCollection.insertOne({
      id,
      nazivPica,
    });
    res
      .status(201)
      .json({ message: "Piće je uspješno dodano.", id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Brisanje određenog pića
export const deletePice = async (req, res) => {
  const piceId = req.params.id;
  try {
    const result = await piceCollection.deleteOne({
      id: piceId,
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Piće nije pronađeno." });
    }

    res.json({ message: "Piće je uspješno obrisano!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const piceMethods = {
  getAllPica,
  getPiceById,
  newPice,
  deletePice,
};
