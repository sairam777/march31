var mongoose = require('mongoose');

mongoose.connect('mongodb://meandb:123456@ds145800.mlab.com:45800/meandatabase');


var userschema = mongoose.Schema({
    name: {
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
    }
});
var user = mongoose.model('register', userschema);
module.exports = user;