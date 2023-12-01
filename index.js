import { customerMethods } from "./Handlers/customerHandler.js";
import { workersMethods } from "./Handlers/workersHandler.js"
import express from "express";
const app = express();
const router = express.Router();
const port = process.env.port | 3000;

app.use(express.json());
app.use("/api", router);
app.listen(port, () => {
    console.log(`Servis radi na portu ${port}`);
});