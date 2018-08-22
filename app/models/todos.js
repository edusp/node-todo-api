var mongoose = require('mongoose');


var Todo = mongoose.model('Todo', {
    title: {
        type: String,
        required: true,                
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Date,
        default: null
    }
   

});

module.exports = {Todo};