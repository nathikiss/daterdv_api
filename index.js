const bodyParser = require('body-parser');
const express = require('express');
const app = express();
require('./models/dbConfig')
const reunionsRoutes = require('./routes/reunionsController');
const mongoose = require('mongoose');

const cors = require('cors');

mongoose.set('useFindAndModify', false);


app.use(bodyParser.json());
//Rend l'api publique
app.use(cors());
//Crud se fait au localhost:5000/reunions
app.use('/reunions', reunionsRoutes);

app.listen(5000, ()=> console.log("Server started : 5000"));