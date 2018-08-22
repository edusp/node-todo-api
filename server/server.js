var express = require('express');
var bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');
var { User } = require('./models/user');
var { Todo } = require('./models/todos');

var app = express();

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
})

app.listen(3000, () => {
    console.log('Started on port::3000');
});
