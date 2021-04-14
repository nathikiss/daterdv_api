const mongoose = require('mongoose');
uri = 'mongodb+srv://admin:omiORHaTfmgU4QIG@cluster0.2ver9.mongodb.net/daterdv';
mongoose.connect(uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (!err) console.log("Mongodb connecter");
        else console.log("Connection error : " + err);
    }
)