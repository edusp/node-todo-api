const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = "edu88sp5";

bcrypt.genSalt(10, (err, salt) => {

    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
    } );

});