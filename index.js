const express = require("express");
const cors = require("cors");
require('dotenv').config()
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oxzfl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri);

client.connect(err => {
    const usersCollection = client.db("evergreenWorld").collection("users");

    // Store user
    app.post("/user",(req, res) => {
        const user = usersCollection.insertOne(req.body)

        res.send(user)
        console.log(user);
    });





    //   client.close();
});



app.get("/", (req, res) => {
    res.send("Getting successfully");
});

app.listen(port, () => {
    console.log("listening on port", port);
});

// user = evergreenUser
// pss = mpYQK1fKCokpdcNr