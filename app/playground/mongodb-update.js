const { MongoClient, ObjectID } = require('mongoDb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {

    if (err) {
        return console.log('Unable to conect');
    }
    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp');

    db.collection('User').findOneAndUpdate(
        {
            _id: new ObjectID('5b7b806817a07af1d4a4114d')
        },
        {
            $set: {
                name: 'Jack',
            },
            $inc: {
                age: 1
            }
        },
        {
            returnOriginal: false
        }
    )
        .then(resp => {
            console.log(resp);
        });

});