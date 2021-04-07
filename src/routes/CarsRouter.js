const express = require('express');
const CarsRouter = express.Router();

const CarsData = require('../models/CarsData');

CarsRouter.get('/getcars', function (req, res) {
    CarsData.find().then(function (data) {
        res.send(data);
    })
});

CarsRouter.post('/addcar', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");

    var car = CarsData(req.body.car);
    car.save();
    res.status(200).send({ "message": "success" });
});

CarsRouter.get('/getcar/:id', function (req, res) {
    var id = req.params.id;
    CarsData.findById({ _id: id }).then(carlist => {
        res.send(carlist);
    });
});

CarsRouter.post('/deletecar', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");

    var id = req.body.carId;
    console.log(id);
    CarsData.findByIdAndDelete({ _id: id }).then(function (message) {
        res.send({ "message": "success" });
    })
    res.status(200);
});

CarsRouter.post('/updatecar', function (req, res) {

    var car = req.body.car;
    var id = car._id;
    CarsData.findByIdAndUpdate({ _id: id }, car, function (err, result) {
        if (err) console.log(err)
        else {
            res.send({ "message": "success" });
        }
    });
})

module.exports = CarsRouter;