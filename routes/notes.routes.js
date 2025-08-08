const express = require("express");
const mongoose = require("mongoose");
const route = express.Router();
const Controllers = require("../controllers/notesControllers")
const controllersdossier = require("../controllers/controllerFichier");
const multer = require("multer");

//configuration de multer pour le stockage des fichiers
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/");
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+ "-" +file.originalname);
    }
});
const upload = multer({storage:storage});

route.get("/",upload.single("fichier"),controllersdossier.getAllNotes);

route.get("/",Controllers.getToutNote );
route.post("/", Controllers.ajouterNotes );

module.exports = route