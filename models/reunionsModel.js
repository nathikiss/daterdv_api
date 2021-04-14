const mongoose = require('mongoose');

//Modèle de la BDD

const ReunionsModel = mongoose.model(
    "daterdv",
    {
        "nom_reunion": {
            type: String,
            required: true
        },
        "mot_de_passe":{
            type: String,
            required: true
        },
        //diff dates+ leur notes
        "dates": {
            type: Array,
            required: true
        },
        //mails+id
        "participants": {
            type: Array,
            required: true
        },
        //nom+mail donc array
        "created_by":
        {
            type: Array,
            required: true
        },
        "created_at": {
            type: Date,
            default: Date.now
        }
    },
    "reunions"

);
module.exports = { ReunionsModel };