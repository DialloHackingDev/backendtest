const Notes = require("../modeles/note.model")


exports.getGestFichier = (req,res)=>{
    if(!req.file) return res.status(400).json({message:"aucun fichier envoyer"});

    //urls d'acces au fichier
    const fileUrl = ` ${req.protocol} :// ${req.get("host")}/uploads/${req.file.fieldname} `;
    return res.status(201).json({message:"fichier telecharger avec succes ",url:fileUrl});

}

exports.getToutNote = async (req,res)=>{
    try{
        const dataNote = await Notes.find();
       return res.status(200).json(dataNote)
    }catch(err){
      return  res.status(500).json({message:"erreur sur le chargement des donnne",err})
    }
}
exports.ajouterNotes = async (req,res) =>{
    try{
        const {matiere,note} = req.body
        console.log(req.body)
        if(!matiere || note === undefined) return res.status(400).json({message:"les champs sont requit"})
        
        const nouvelleNote =  Notes.insertOne({matiere,note});
         return res.status(201).json({message:"la note ajouter avec success! ",note:nouvelleNote})
    }catch(e){
        console.error("erreur est ",e)
       return res.status(500).json("erreu du server")
    }   
}