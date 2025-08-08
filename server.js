require("dotenv").config();
const express = require("express");
const mongoose = require("./config/db");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT;


mongoose.connection.on("connected", () => {
    console.log(" MongoDB connecté");
});

mongoose.connection.on("error", (err) => {
    console.log(" Erreur MongoDB :", err);
});

// console.log("===> contenue helmet")
// console.log(helmet);

const app = express();

app.use(helmet());
app.use(cors({
    origin: ["http://localhost:3001"],
    methods: ["POST", "GET", "PUT", "DELETE"]
}));
app.use(express.json());

// Sert les fichiers uploadés via /telecharger/nom_du_fichier
app.use("/telecharger", express.static(path.join(__dirname, "uploads")));





const route = require("./routes/notes.routes");
app.use("/api/notes", route);







app.listen(PORT, () => {
    console.log(`Le serveur démarre sur http://localhost:${PORT}`);
});