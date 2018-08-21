const { MongoClient, ObjectID } = require('mongoDb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {

    if (err) {
        return console.log('Unable to conect');
    }
    console.log('Connected to MongoDB server');
    /*    const db = client.db('TodoApp');
   
       db.collection('Todos').find({
           _id: new ObjectID('5b7b9147ea9c518cba441b44')
       }).count()
       .then((docs) => console.log(JSON.stringify(docs,undefined, 2)) )
       .catch(err => console.log(err));
    */

    const db = client.db('TodoApp');
    db.collection('User').find({name: 'Eduardo'}).toArray()
    .then((docs) => console.log(JSON.stringify(docs,undefined, 2)) )
       .catch(err => console.log(err));


    client.close();
})