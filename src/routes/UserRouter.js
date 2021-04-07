const express = require('express');
var UserRouter = express.Router();

const RegistrationData = require('../models/RegistrationData');

const jwt = require('jsonwebtoken');

UserRouter.post('/adduser', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");

    RegistrationData.find({ email: req.body.user.email }).then(data => {
        if (data[0]) {
            res.send({ "message": "email dupe" });
        }
        else {
            var user = RegistrationData(req.body.user);
            user.save();
            res.send({ "message": "success" });
        }
    });

});

UserRouter.post('/updaterole', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");

    var user = req.body.user;
    var id = user._id;
    RegistrationData.findByIdAndUpdate({ _id: id }, user, function (err, result) {
        if (err) console.log(err);
        else {
            res.send({ "message": "success" });
        }
    });
});

UserRouter.post('/loginvalidate', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    var userdata = req.body.user;

    RegistrationData.find({ email: userdata.email }).then(data => {
        flag = 0
        if (data[0]) {
            if (userdata.password == data[0].password) {
                let payload = { subject: userdata.email + userdata.password };
                let token = jwt.sign(payload, "secretkey");
                res.status(200).send({ "message": "Success", "id": data[0]._id, "token": token, "role": data[0].role });
            }
            else {
                res.send({ "message": "Wrong Password" });
            }
        }
        else {
            res.send({ "message": "Wrong email" });
        }
    });
});

UserRouter.post('/getuser', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    var id = req.body.id;

    RegistrationData.find({ _id: id }).then(data => {
        res.send(data);
    });
});

UserRouter.post('/getusers', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");

    RegistrationData.find().then(data => {
        res.send(data);
    });
});

module.exports = UserRouter;