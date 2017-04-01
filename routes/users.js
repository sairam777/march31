var express = require('express');
var router = express.Router();
var passport = require('passport');

var controller = require('../controllers/useractions');






/* GET users listing. */
router.post('/register', function(req, res, next) {
    controller.addUser(req, res, next);
});

router.post('/authenticate', function(req, res, next) {
    controller.authenticate(req, res, next);
});

router.get('/profile', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    res.json({ user: req.user });
});

router.get('/validate', function(req, res, next) {
    res.send('VALIDATE');
});
module.exports = router;