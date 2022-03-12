const express = require('express');

require("dotenv").config();
require("./config/database").connect();

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;


const app = express();

app.listen(port, function() {
    console.log(`Server running on port ${port}`);
  });

app.use(express.json());

//Logic
//Routes
//importing car model
const Cars = require("./models/Cars");


//Get cars
app.get('/cars', async (req, res) => {
    const cars = await Cars.find();
    console.log('showing car collection')
    res.json(cars);
})


//Post cars
app.post('/createcars', async (req, res) => {
    //Get inputs
    const {brand, model} = req.body;

    //Create cars in the db
    const car = await Cars.create({
        brand,
        model
    })

    res.status(201).json(car);
    res.status(201).send("added to db");
})

//Delete cars
app.delete('/deletecars/:brand', async (req, res) => {
    await res.cars.delete();
    res.json("Car deleted")
}) ;