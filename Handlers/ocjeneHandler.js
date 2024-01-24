import db from "../src/db.js";

const ocjeneCollection = db.collection("Ocjena");

// Ispisivanje svih ocjena
export const getAllOcjene = async (req, res) => {
  try {
    const ocjene = await ocjeneCollection.find().toArray();
    res.json(ocjene);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Traženje samo jedne ocjene
export const getOcjenaById = async (req, res) => {
  const ocjenaId = req.params.id;

  try {
    const ocjena = await ocjeneCollection.findOne({ id: ocjenaId });
    if (!ocjena) {
      return res
        .status(404)
        .json({ message: "Odabrana ocjena nije pronađena." });
    }
    res.json(ocjena);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Dodavanje nove ocjene
export const newOcjena = async (req, res) => {
  const { id, ocjena, komentar } = req.body;
  try {
    const result = await ocjeneCollection.insertOne({
      id,
      ocjena,
      komentar,
    });
    res
      .status(201)
      .json({ message: "Ocjena je uspješno dodana.", id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Brisanje samo jedne ocjene
export const deleteOcjena = async (req, res) => {
  const ocjenaId = req.params.id;
  try {
    const result = await ocjeneCollection.deleteOne({
      id: ocjenaId,
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Ocjena nije pronađena." });
    }

    res.json({ message: "Ocjena je uspješno obrisana!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const ocjeneMethods = {
  getAllOcjene,
  getOcjenaById,
  newOcjena,
  deleteOcjena,
};
