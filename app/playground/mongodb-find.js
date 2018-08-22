const { MongoClient, ObjectID } = require('mongoDb');
const express = require('express');

var app = express();

app.get('/', (req, resp) => {

    resp.send('Working');
});

app.get('/todos', (req, resp) => {

    MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {

        if (err) {
            return console.log('Unable to conect');
        }

        const db = client.db('TodoApp');
        db.collection('User').find({ name: 'Eduardo' }).toArray()
            .then((docs) => {
                resp.send(docs);

                console.log(JSON.stringify(docs, undefined, 2));

            })

            .catch(err => console.log(err));

        client.close();
    })
   
});

app.listen(3000);
