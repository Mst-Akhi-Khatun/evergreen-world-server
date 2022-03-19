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

client.connect(err => {
    const usersCollection = client.db("evergreenWorld").collection("users");
    const plantsCollection = client.db("evergreenWorld").collection("plants");
    const ordersCollection = client.db("evergreenWorld").collection("orders");


    // All plants
    app.get("/plants", async (req, res) => {
        const plants = await plantsCollection.find({}).toArray();
        res.json(plants);
    })

    // single plants
    app.get("/plantDetail/:id", async (req, res) => {
        const id = req.params.id;
        const plant = await plantsCollection.findOne({ _id: ObjectId(id) });
        console.log(plant);
        res.json(plant);
    })

    // Store user
    app.post("/user", async (req, res) => {
        const user = await usersCollection.insertOne(req.body)
        res.send(user)
    });

    // order a plant
    app.post("/order", async (req, res) => {
        const order = await ordersCollection.insertOne(req.body)
        res.send(order)
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