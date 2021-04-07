const express = require('express');
var OrdersRouter = express.Router();

var OrdersData = require('../models/OrdersData');
var RegistrationData = require('../models/RegistrationData');

OrdersRouter.post('/addorder', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");

    var order = OrdersData(req.body.order);
    var date = new Date();
    RegistrationData.find({ _id: order.customerid }).then(data => {
        if (data[0]) {
            order.orderdate = `${date.toDateString()}`;
            order.ordertime = String(date.toTimeString());
            order.save();
            res.send({ "message": "success" })
        }
        else{
            res.send({ "message": "fail" })
        }
    });

});

OrdersRouter.post('/getmyorders', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");

    var id = req.body.id;
    OrdersData.find({ customerid: id }).then(orders => {
        if (orders.length > 0) {
            res.send(orders);
        }
        else {
            res.send({ "message": "No Orders Found" });
        }
    });
});

OrdersRouter.get('/getallorders', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");

    OrdersData.find().then(orders => {
        if (orders.length > 0) {
            res.send(orders);
        }
        else {
            res.send({ "message": "No Orders Found" });
        }
    });
});

OrdersRouter.post('/getorder', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");

    var id = req.body.id;
    OrdersData.find({ _id: id }).then(orders => {
        if (orders.length > 0) {
            res.send(orders);
        }
        else {
            res.send({ "message": "No Orders Found" });
        }
    });
});

OrdersRouter.post('/processorder', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");

    var order = req.body.order;
    OrdersData.findByIdAndUpdate({ _id: order._id }, order, function (err, data) {
        if (err) console.log(err);
        else {
            res.send({ "message": "success" });
        }
    });
});


module.exports = OrdersRouter;