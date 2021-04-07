const express = require('express');
const app = new express();

var port = process.env.PORT || 7000
const jwt = require('jsonwebtoken');


const cors = require('cors');
app.use(cors());
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));

const CarsRouter = require('./src/routes/CarsRouter');
app.use('/cars', CarsRouter);

const UserRouter = require('./src/routes/UserRouter');
app.use('/users', UserRouter);

const OrdersRouter = require('./src/routes/OrdersRouter');
app.use('/orders', OrdersRouter);

const ServiceRouter = require('./src/routes/ServiceRouter');
app.use('/bookings', ServiceRouter);

app.get('/test', function (req, res) {
    res.send('yes');
});

app.listen(port, function () {
    console.log('Backend listening at port ' + port);
});