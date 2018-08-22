const { MongoClient, ObjectID } = require('mongoDb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {

    if (err) {
        return console.log('Unable to conect');
    }

    const db = client.db('TodoApp');

    db.collection('Todos').deleteMany({ text: 'One more' })
        .then(resp => {
            console.log(resp);
        });

});