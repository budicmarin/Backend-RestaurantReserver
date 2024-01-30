import mongo from "mongodb";
import db from "./db.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const gostiCollection = db.collection("Gosti");

gostiCollection.createIndex({ email: 1 }, { unique: true });

export default {
  async registerGost(gostData) {
    const hashedPassword = await bcrypt.hash(gostData.password, 10);
    try {
      await gostiCollection.insertOne({
        _id: new ObjectId(),
        firstName: gostData.firstName,
        lastName: gostData.lastName,
        email: gostData.email,
        password: hashedPassword,
      });
    } catch (e) {
      if (e.email == "MongoError") {
        if (e.code === 11000) {
          throw new Error("Email already exists.");
        }
      }
    }
  },

  async authenticateGost(email, password) {
    let gostData = await gostiCollection.findOne({ email: email });

    if (
      gost &&
      gost.password &&
      (await bcrypt.compare(password, gost.password))
    ) {
      delete gostData.password;
      let token = jwt.sign(gost, process.env.JWT_SECRET, {
        algorithm: "HS256",
        expiresIn: "1 week",
      });
      return {
        token,
        email: gostData.email,
      };
    } else {
      throw new Error("Cannot authenticate");
    }
  },
};
