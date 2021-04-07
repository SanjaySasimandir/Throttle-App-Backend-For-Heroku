// Accessing Mongoose Package
const mongoose = require('mongoose');

// Database connection
mongoose.connect('mongodb+srv://secretuser007:secretuser007@neverdown.xk0jd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

// Schema Definition
const Schema = mongoose.Schema;

const RegistrationSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    phone: Number,
    address: String,
    role: String
});

// Model Creation
var RegistrationData = mongoose.model('Registrationdata', RegistrationSchema);

module.exports = RegistrationData;