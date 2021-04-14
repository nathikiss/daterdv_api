const express = require('express');
const router = express.Router();
const ObjectID = require("mongoose").Types.ObjectId;
const { ReunionsModel } = require('../models/reunionsModel');

//CRUD

//READ

router.get('/', (req, res) => {
    ReunionsModel.find((err, docs) =>{
        if(!err) res.send(docs);
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
        else console.log('Error Creating date : '+err)
    })
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