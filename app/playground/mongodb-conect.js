const { MongoClient } = require('mongoDb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {

    if (err) {
        return console.log('Unable to conect');
    }
    console.log('Connected to MongoDB server');

    client.close();
})