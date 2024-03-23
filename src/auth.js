import mongo from "mongodb";
import db from "./db.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const gostiCollection = db.collection("Gosti");

gostiCollection.createIndex({ email: 50 }, { unique: true });

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
      if (e.code === 11000) {
        throw new Error("Email already exists");
      } else {
        throw e;
      }
    }
  },

  async authenticateGost(email, password) {
    let gostData = await gostiCollection.findOne({ email: email });

    console.log("Received data: ", email, password);
    console.log("User data from the database: ", gostData);

    if (
      gostData &&
      gostData.password &&
      (await bcrypt.compare(password, gostData.password))
    ) {
      delete gostData.password;
      let token = jwt.sign(
        { id: gostData._id },
        process.env.JWT_SECRET || "default_secret",
        {
          algorithm: "HS256",
          expiresIn: "1 week",
        }
      );
      return {
        token,
        email: gostData.email,
      };
    } else {
      throw new Error("Cannot authenticate");
    }
  },

  verify(req, res, next) {
    try {
      let authorization = req.headers.authorization.split(" ");
      let type = authorization[0];
      let token = authorization[1];

      if (type !== "Bearer") {
        return res.status(401).send();
      } else {
        req.jwt = jwt.verify(token, process.env.JWT_SECRET);
        return next();
      }
    } catch (e) {
      return res.status(403).send();
    }
  },
};
