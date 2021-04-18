const express = require('express');
const router = express.Router();
const ObjectID = require("mongoose").Types.ObjectId;
const { ReunionsModel } = require('../models/reunionsModel');
var nodemailer = require('nodemailer');
const PORT_VUE=process.env.PORT_VUE
//CRUD

//READ

router.get('/', (req, res) => {
    ReunionsModel.find((err, docs) =>{
        if(!err) res.send(docs)
        else console.log('Error to get data: ' + err)
        
    })
})

//READ ONE

router.get("/:id",(req, res) =>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send("ID unknown : "+req.params.id)
    }
    
    ReunionsModel.findById(
        req.params.id,
        (err, docs) =>{
            if(!err) res.send(docs);
            else console.log("Error to get data : "+ err)
        }
    )});

//CREATE

router.post('/',(req, res) => {
    const newRecord = new ReunionsModel( {
        nom_reunion: req.body.nom_reunion,
        mot_de_passe: req.body.mot_de_passe,
        dates: req.body.dates,
        participants: req.body.participants,
        created_by: req.body.created_by,
        created_at: req.body.created_at
    })
   

    newRecord.save((err,docs)=>{
        if(!err) res.send(docs);
        else console.log('Error Creating date : '+err +" \n "+ docs)
    })

    //Envoi de mail
    //TABLEAU permettant de stocker les participants
    const emails = [];
    var nomCreateur=req.body.created_by[0].nom;
    for(let counter=0; counter<req.body.participants.length; counter++){
        emails.push(req.body.participants[counter].participant)
    }
    
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'daterdvvue@gmail.com',
          pass: 'lppwm2021'
        }
      });
      
      var mailOptions = {
        from: 'daterdvvue@gmail.com',
        to: emails,
        subject: "Invitation à la reunion : "+req.body.nom_reunion,
        text: nomCreateur+" vous invite à voter pour la meilleur date de réunion ici :\n"+
        "http://localhost:"+PORT_VUE+"/votes \n Voici le code d'accès au vote: \n"+req.body.mot_de_passe
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
})

//UPDATE
router.put("/:id",(req, res) =>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send("ID unknown : "+req.params.id)
    }
    const updateRecord = {
        nom_reunion: req.body.nom_reunion,
        mot_de_passe: req.body.mot_de_passe,
        dates: req.body.dates,
        participants: req.body.participants,
        created_by: req.body.created_by,
        created_at: req.body.created_at
    };

    ReunionsModel.findByIdAndUpdate(
        req.params.id,
        { $set : updateRecord },
        { new : true },
        (err,docs) => {
            if (!err) res.send(docs);
            else console.log("Update error : "+err);
        }
    )
})

//DELETE

router.delete("/:id",(req, res) =>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send("ID unknown : "+req.params.id)
    }
    ReunionsModel.findByIdAndRemove(
        req.params.id,
        (err, docs) =>{
            if(!err) res.send(docs);
            else console.log("Delete error : "+ err)
        }
    )});
module.exports = router;