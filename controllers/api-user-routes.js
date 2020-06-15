const db = require('../models');
const passport = require('../config/passport');

module.exports = function(app){
    app.post('/api/user', (req, res) => {
        db.User.create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        }).then((result) => {
            res.json(result);
        })
    })

    app.post("/api/login", passport.authenticate("local"), function(req, res) {
        res.json(req.user);
    });

    app.get('/api/user', (req, res) => {
        db.User.findAll().then((result) => {
            res.json(result);
        })
    })
}