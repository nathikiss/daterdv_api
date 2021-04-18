const mongoose = require('mongoose');
uri = process.env.URI;
mongoose.connect(uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (!err) console.log("Mongodb connecter");
        else console.log("Connection error : " + err);
    }
)