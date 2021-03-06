const mongoose = require('mongoose');
const validator = require('validator');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function () {
    var user = this;
    var userObj = user.toObject();
    return _.pick(userObj, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({ _id: user._id.toHexString(), access }, 'abc123').toString();

    user.tokens.push({ access, token });

    return user.save().then(() => {
        return token;
    })
}

UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, 'abc123');
    } catch (e) {
        Promise.reject();
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
}


UserSchema.method.find = function() {
    var User = this;
    return User.find();
}

UserSchema.pre('save', function (next) {
    var User = this;

    if (User.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {

            bcrypt.hash(User.password, salt, (err, hash) => {
                User.password = hash;
                next();
            });

        });

    } else {
        next();
    }
});

var User = mongoose.model('User', UserSchema);

module.exports = { User };