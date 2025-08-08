const Notes = require("../modeles/note.model");

// Fonction pour uploader et enregistrer le nom du fichier
exports.uploadNote = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "Aucun fichier envoyé" });

        const { matiere, note } = req.body;
        const nouvelleNote = await Notes.create({
            matiere,
            note,
            fichier: req.file.filename
        });

        // Générer l'URL d'accès au fichier
        const fileUrl = `${req.protocol}://${req.get("host")}/telecharger/${req.file.filename}`;

        res.status(201).json({
            message: "Note et fichier enregistrés avec succès",
            note: nouvelleNote,
            url: fileUrl
        });
    } catch (e) {
        res.status(500).json({ message: "Erreur lors de l'enregistrement", error: e });
    }
};

// Fonction pour afficher toutes les notes avec l'URL du fichier
exports.getAllNotes = async (req, res) => {
    try {
        const notes = await Notes.find();
        // Ajouter l'URL complète pour chaque fichier
        const notesAvecUrl = notes.map(note => ({
            ...note._doc,
            url: note.fichier ? `${req.protocol}://${req.get("host")}/telecharger/${note.fichier}` : null
        }));
        res.status(200).json(notesAvecUrl);
    } catch (e) {
        res.status(500).json({ message: "Erreur lors de la récupération", error: e });
    }
};