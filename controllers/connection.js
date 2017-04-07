var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://meandb:123456@ds145800.mlab.com:45800/meandatabase');


var userschema = mongoose.Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    empid: {
        type: Number,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    star: {
        type: String,
        required: true
    },

});
var user = mongoose.model('register', userschema);
module.exports = user;