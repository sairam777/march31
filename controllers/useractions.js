var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var xoauth = require("xoauth2");

var user = require('./connection.js');



exports.addUser = function(req, res, next) {
    var user_mail = req.body.email;
    user.find({ email: user_mail }, function(err, docs) {
        if (docs[0] == null) {
            var newUser = new user({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                username: req.body.username,
                star: req.body.star,
                password: req.body.password,
                mobile: req.body.mobile,
                empid: req.body.empid,
                dob: req.body.dob,
                gender: req.body.gender,
                image: req.body.image

            });
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(newUser.password, salt, function(err, hash) {

                    if (err) {
                        throw err
                    } else {
                        newUser.password = hash;
                        console.log(hash)
                        newUser.save();
                    }
                    newUser.save(function(err, user) {
                        if (err) {
                            res.json({ success: false, msg: "Failed to register user" })
                        } else if (user) {
                            console.log(user);
                            res.json({ success: true, msg: "User Register successfully" })

                            var transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    type: 'OAuth2',
                                    user: 'innostarsvizag@gmail.com',
                                    clientId: '846310357001-b0he7ipjmrgfgeto1mnlmechsudi19vg.apps.googleusercontent.com',
                                    clientSecret: 'ukFiyYB632NyXNcssCAJ7Ea6',
                                    refreshToken: '1/s8BxjvmAZlMB3RKza1dcPkbnk0VnsPPdQ9BylrfBTwo',
                                    accessToken: 'ya29.GlslBOchOzbXflPrvFUY11OvXjv_AX18_6YEonFwJlc0owc7MYx_UR_bWC9JnpI5RVkp8BYtHauw1FgELT8220dFL2KYbepRZHJNAuSwSVWiWumIQPuGKVrPx2Ie'

                                }
                            })
                            var mailOptions = {
                                from: 'Innominds Stars Group  <innostarsvizag@gmail.com>',
                                to: req.body.email,
                                subject: 'Registration Successfully',
                                html: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head></head><body><style></style><div><b style="color:orange">Dear ' + req.body.firstname + ',</div><div> Welcome to Innominds Stars Registration</div></b><div>Your Registartion is Successfully Completed...</div><div>You can Login now using below credentials..</div><div>User name:<span style="color:green">' + req.body.username + '</span></div><div>Password:<span style="color:green">12345</span></div><div>You are <span style="color:green">' + req.body.star + '</span> in innominds stars group...</div></body></html>'
                            }

                            transporter.sendMail(mailOptions, function(err, resp) {
                                if (err) {
                                    console.log('Error' + err);
                                } else {
                                    console.log('Email Sent');
                                    res.json(0)
                                }
                            })
                        }
                    })
                });
            });


        } else {
            res.json({ success: false, msg: "User Already Exists..please try with another Email..." })
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
            return res.json({ success: false, msg: 'user not found' });
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

    });

}

exports.allStars = function(req, res, next) {
    user.find(function(err, data) {
        if (err) {
            throw err;
        } else {
            res.json({ status: 200, data: data })
        }
    })
}