import mongo from "mongodb";
import db from "./db.js";
import { ObjectId } from "mongodb";

const gostiCollection = db.collection("Gosti");

export default {
  async registerGost(gostData) {
    await gostiCollection.insertOne({
      _id: new ObjectId(),
      firstName: gostData.firstName,
      lastName: gostData.lastName,
      email: gostData.email,
      password: gostData.password,
    });
  },
};
