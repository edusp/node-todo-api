const { MongoClient, ObjectID } = require('mongoDb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {

    if (err) {
        return console.log('Unable to conect');
    }

    const db = client.db('TodoApp');
    db.collection('User').find({ name: 'Eduardo' }).toArray()
        .then((docs) => console.log(JSON.stringify(docs, undefined, 2)))
        .catch(err => console.log(err));


    client.close();
})