import express from "express";
import connect from "../db/connection.js";

const app = express(); // instanciranje aplikacije
const port = 3000; // port na kojem će web server slušati

app.get("/", (req, res) => res.send("Hello World"));

app.listen(port, () => console.log(`Slušam na portu ${port}!`));
