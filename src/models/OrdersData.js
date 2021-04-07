// Accessing Mongoose Package
const mongoose = require('mongoose');

// Database connection
mongoose.connect('mongodb+srv://secretuser007:secretuser007@neverdown.xk0jd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

// Schema Definition
const Schema = mongoose.Schema;

const OrdersSchema = new Schema({
    carid: String,
    deliverydate: String,
    deliverymode: String,
    customerid: String,
    orderdate: String,
    ordertime: String,
    status: String
});

// Model Creation
var OrdersData = mongoose.model('ordersdata', OrdersSchema);

module.exports = OrdersData;