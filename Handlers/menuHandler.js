import db from "../src/db.js";

const menuCollection = db.collection("Menu");

// Ispis svih menu-a
export const getAllMenu = async (req, res) => {
  try {
    const menu = await menuCollection.find().toArray();
    res.json(menu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Ispis samo jednog menu-a po ID-u
export const getMenuById = async (req, res) => {
  const menuId = req.params.id;
  try {
    const menu = await menuCollection.findOne({ id: menuId });
    if (!menu) {
      res.status(404).json({ message: "Odabrani meni nije pronađen." });
    }
    res.json(menu);
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ error: error.message });
    }
  }
};
// Dodavanje novog menu-a
export const newMenu = async (req, res) => {
  const { id, nazivMenua } = req.body;
  try {
    const result = await menuCollection.insertOne({
      id,
      nazivMenua,
    });
    res
      .status(201)
      .json({ message: "Menu je uspješno dodan.", id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Brisanje određenog menu-a
export const deleteMenu = async (req, res) => {
  const menuId = req.params.id;
  try {
    const result = await menuCollection.deleteOne({
      id: menuId,
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Menu nije pronađen." });
    }

    res.json({ message: "Menu je uspješno obrisan!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getbyMenuFromCategory = async (req, res) => {
  try {
    let query = {};
    if (req.query.category) {
      query.category = req.query.category;
    }
    const menuItems = await Menu.find(query);
    res.json(menuItems);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const menuMethods = {
  getAllMenu,
  getMenuById,
  newMenu,
  deleteMenu,
  getbyMenuFromCategory,
};
