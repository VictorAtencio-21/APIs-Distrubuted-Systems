const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const fetch = require("node-fetch")
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

//host and port
const { API_PORT } = process.env;
const { API_HOST } = process.env;

const port = process.env.PORT || API_PORT;
const host = process.env.HOST || API_HOST;

//Initializations
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, function() {
    console.log(`Server running on port ${port}`);
  });

//Logic
//Routes
app.get('/:email-:password', checkToken, (req, res)  => {
    jwt.verify(req.token, 'privatekey', (err, authorizedData) => {
        if(err){
            //If error send Forbidden (403)
            console.log('ERROR: Could not connect to the protected route');
            res.sendStatus(403);
        } else {
             fetch("http://127.0.0.1:4002")
            .then(rez => rez.json())
            .then(data => res.json(data))
            console.log('SUCCESS: Connected to protected route');
        }
    })
});

app.get('/cars/', checkToken, (req, res) => {
    fetch(`http://127.0.0.1:4002/cars}`)
    .then(rez => rez.json())
    .then(data => res.json(data))
});

app.post('/createcars/:brand-:model', checkToken, (req, res) => {
    const {brand, model} = req.body;

    fetch("http://127.0.0.1:4002/createcars", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Request-Methods": "POST, OPTIONS"
        },
        body: JSON.stringify({
            "brand": brand,
            "model": model
        })
    }).then(rez => res.send(rez.message))
});

app.delete("/deletecars/:brand", checkToken, async (req, res) => {
    await fetch(`http://127.0.0.1:4002/deletecars/${req.params.brand}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Request-Methods": "DELETE, OPTIONS"
        }
    }).then(rez => res.send(rez.message))
})

const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];

    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token;
        next();
    } else {
        //If header is undefined return Forbidden (403)
        res.sendStatus(403)
    }
}