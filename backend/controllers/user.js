const bCrypt = require('bcrypt');
const User = require('../models/User');
const user = require('../models/User');

exports.signUp = (req, res, next) => {
    bCrypt.hash(req.body.password, 10)
        .then(hash => {
            
            const user = new User({
                email: req.body.email,
                password: hash
            });

            user.save()
                .then(() => res.status(201).json( { message: 'User has been created !' } ))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }) );
};

exports.login = (req, res, next) => {

};