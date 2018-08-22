var express = require('express');
var bodyParser = require('body-parser');

var {ObjectID} = require('mongodb');
var { mongoose } = require('./db/mongoose');
var { User } = require('../app/models/user');
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
    if(!ObjectID.isValid(req.params.id)) {
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

app.listen(port, () => {
    console.log(`Started on port::${port}`);
});
