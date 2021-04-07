// Accessing Mongoose Package
const mongoose = require('mongoose');

// Database connection
mongoose.connect('mongodb+srv://secretuser007:secretuser007@neverdown.xk0jd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

// Schema Definition
const Schema = mongoose.Schema;

const CarsSchema = new Schema({
    model: String,
    brand: String,
    year: String,
    price: Number,
    img: String,
    transmission: String,
    horsepower: Number,
    description: String
});

// Model Creation
var CarsData = mongoose.model('carsdata', CarsSchema);

module.exports = CarsData;