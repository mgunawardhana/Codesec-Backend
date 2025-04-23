const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String, required: true, trim: true, minlength: 2, maxlength: 100
    }, email: {
        type: String, required: true, unique: true, lowercase: true, match: /.+\@.+\..+/,
    }, age: {
        type: Number, required: false, min: 0, max: 120
    }, password: {
        type: String, required: true, minlength: 8,
    }, phone: {
        type: String, required: true, match: /^\d{10}$/,
    }, address: {
        type: String, required: false,
    }, city: {
        type: String, required: false,
    }, state: {
        type: String, required: false,
    }, zip: {
        type: String, required: false,
    }, country: {
        type: String, required: false,
    },
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User;
