var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var user = require('./connection.js');



exports.addUser = function(req, res, next) {

    var newUser = new user({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            if (err) {
                throw err
            } else {
                newUser.password = hash;
                newUser.save();
            }
        });
    });
    newUser.save(function(err, user) {
        if (err) {
            throw err
        } else {
            res.json(0)
        }
    })

}


exports.authenticate = function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var query = { username: username };
    user.findOne(query, function(err, user) {
        console.log(user);
        if (err) {
            throw err;
        } else if (!user) {
            return res.json({ success: false, msg: 'usernotfound' });
        }

        bcrypt.compare(password, user.password, function(err, isMatch) {
            if (err) {
                throw err;
            }
            if (isMatch) {
                var secret = '123456';
                var token = jwt.sign(user, secret, {
                    expiresIn: 604800
                });
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({ success: false, msg: 'wrong password' });
            }

        })

    })
}