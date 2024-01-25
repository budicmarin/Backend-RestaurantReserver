import mongo from "mongodb";
import db from "./db.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

const gostiCollection = db.collection("Gosti");

export default {
  async registerGost(gostData) {
    const hashedPassword = await bcrypt.hash(gostData.password, 10);
    await gostiCollection.insertOne({
      _id: new ObjectId(),
      firstName: gostData.firstName,
      lastName: gostData.lastName,
      email: gostData.email,
      password: hashedPassword,
    });
  },
};
