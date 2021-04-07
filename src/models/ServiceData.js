// Accessing Mongoose Package
const mongoose = require('mongoose');

// Database connection
mongoose.connect('mongodb+srv://secretuser007:secretuser007@neverdown.xk0jd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

// Schema Definition
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
    carmake: String,
    carmodel: String,
    caryear: String,
    pickupdate: String,
    pickupmode: String,
    customerid: String,
    orderdate: String,
    ordertime: String,
    deliverydate: String,
    deliverymode: String,
    repairslist: String,
    cost: Number,
    status: String
});

// Model Creation
var ServiceData = mongoose.model('servicedata', ServiceSchema);

module.exports = ServiceData;