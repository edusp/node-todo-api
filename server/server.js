const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');

var { ObjectID } = require('mongodb');
var { mongoose } = require('./db/mongoose');
var { User } = require('../app/models/user');
var { authenticate } = require('../server/middleware/authenticate');

var { Todo } = require('../app/models/todos');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var newTodo = new Todo({
        title: req.body.title
    });

    newTodo.save().then(doc => {
        res.status(201);
        res.send(doc);
    }).catch(e => {
        res.status(400);
        res.send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then(doc => {
        res.status(200);
        res.send(doc);
    }).catch(e => {
        res.status(400);
        res.send(e);
    });
});

app.get('/todos/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(404).send();
    }

    Todo.findById(req.params.id).then(doc => {
        res.status(200);
        res.send(doc);
    }).catch(e => {
        res.status(400);
        res.send(e);
    });
});

app.patch('/todos/:id', (req, res) => {

    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'complited']);

    if (!ObjectID.isValid(req.params.id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.complited) && body.complited) {
        body.complitedAt = new Date().getTime()
    } else {
        body.complited = false;
        body.complitedAt = null;
    }


    Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
        .then((todo) => {
            if (!todo) {
                return res.status(404).send();
            }
            res.send({ todo });
        })
        .catch((e) => res.status(400).send());

});

app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['name', 'email', 'password']);

    var user = new User(body);
    user.save()
        .then(() => {

            user.generateAuthToken()
                .then((token) => {
                    res.header('x-auth', token).status(201).send(user);
                })
        })
        .catch(e => {
            console.log(e);
            res.status(400).send(e);
        })
});

app.get('/users', (req, res) => {
    User.find().then(resp => {
        res.send(resp);
    });
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.listen(port, () => {
    console.log(`Started on port::${port}`);
});
