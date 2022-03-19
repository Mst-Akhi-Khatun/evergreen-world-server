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

    // get order by email
    app.get("/myOrders/:email", async (req, res) => {
        const email = req.params.email;
        const order = await ordersCollection.find({ email: email }).toArray();
        res.json(order);
    })

    // remove a plant from my order
    app.delete("/removeOrder/:id", async (req, res) => {
        const id = req.params.id;
        const plant = await ordersCollection.deleteOne({ _id: ObjectId(id) });
        console.log(plant);
        res.json(plant);
    })
    // load all orders
    app.get("/allOrders", async (req, res) => {
        const orders = await ordersCollection.find({}).toArray();
        res.json(orders);
    })

    // load a single order with id to update

    app.get("/allOrders/:id", async (req, res) => {
        const id = req.params.id;
        const order = await ordersCollection.findOne({ _id: ObjectId(id) });
        res.json(order);
    })

    //  update status
    app.put("/allOrders/:id", async (req, res) => {
        const id = req.params.id;
        const updateStatus = req.body;
        const filter = { _id: ObjectId(id) };
        const updateDoc = {
            $set: {
                status: updateStatus.status,
            },
        };
        const result = await ordersCollection.updateOne(
            filter,
            updateDoc,
        );
        res.json(result);
    });

    // add a plant
    app.post("/addItem", async (req, res) => {
        const item = await plantsCollection.insertOne(req.body)
        res.send(item)
    });

    // remove a plant from manage order
    app.delete("/removeItem/:id", async (req, res) => {
        const id = req.params.id;
        const plant = await plantsCollection.deleteOne({ _id: ObjectId(id) });
        console.log(plant);
        res.json(plant);
    })

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