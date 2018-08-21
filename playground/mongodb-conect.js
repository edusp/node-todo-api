const {MongoClient, ObjectID} = require('mongoDb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {

    if (err) {
        return console.log('Unable to conect');
    }
    console.log('Connected to MongoDB server');

    /* const db = client.db('TodoApp');
    
    db.collection('Todos').insertOne({
        text: 'Something to do',
        completed: false

    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert Todo');
        }

        console.log(JSON.stringify(result.ops, undefined, 2));

    }) */

    /* const db = client.db('TodoApp');

    db.collection('User').insertOne({
        name: 'Eduardo',
        age: '29',
        location: 'Sydney'
    },
        (err, result) => {
            if (err) {
                return console.log('Unable to insert Todo');
            }

            console.log(JSON.stringify(result.ops, undefined, 2));
            
        }) */

        client.close();
    })