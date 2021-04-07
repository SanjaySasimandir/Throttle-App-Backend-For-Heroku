const express = require('express');
var ServiceRouter = express.Router();

var ServiceData = require('../models/ServiceData');
var RegistrationData = require('../models/RegistrationData');

ServiceRouter.post('/addbooking', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");

    var booking = ServiceData(req.body.booking);
    var date = new Date();
    RegistrationData.find({ _id: booking.customerid }).then(data => {
        if (data[0]) {
            booking.orderdate = `${date.toDateString()}`;
            booking.ordertime = String(date.toTimeString());
            booking.save();
            res.send({ "message": "success" });
        }
        else {
            res.send({ "message": "failure" });
        }
    });
});

ServiceRouter.post('/getmyorders', function (req, res) {
    var id = req.body.id;
    ServiceData.find({ customerid: id }).then(data => {
        res.send(data);
    });
});

ServiceRouter.post('/getallorders', function (req, res) {
    var id = req.body.id;
    ServiceData.find().then(data => {
        res.send(data);
    });
});

ServiceRouter.post('/getbooking', function (req, res) {
    var id = req.body.id;
    ServiceData.find({ _id: id }).then(data => {
        res.send(data[0]);
    });
});

ServiceRouter.post('/processbooking', function (req, res) {
    var booking = req.body.booking;
    ServiceData.findByIdAndUpdate({ _id: booking._id }, booking, function (err, result) {
        if (err) console.log(err);
        else {
            res.send({ "message": "success" });
        }
    });
});

module.exports = ServiceRouter;