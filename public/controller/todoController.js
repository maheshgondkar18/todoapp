var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect To The Database
mongoose.connect('mongodb+srv://Mahesh1817:Mahesh.16@cluster0.tt98tdj.mongodb.net/todo');

//Create a Schema - This is like a blueprint
var todoSchema = new mongoose.Schema({
    item: String
});

//Create a Model
var Todo = mongoose.model('Todo', todoSchema);
// var itemOne = Todo({ item: 'Buy Flowers' }).save(function (err) {
//     if (err) throw err;
//     console.log('Item Saved');
// });

// var data = [{ item: 'Get Dairy' }, { item: 'Hit the Gym' }, { item: 'Do some Coding' }];
var urlencodedParser = bodyParser.urlencoded({ extended: false }); //middleware

module.exports = function (app) {

    app.get('/todo', function (req, res) {
        //get data from mongoDB and pass it to the view
        Todo.find({}, function (err, data) {
            if (err) throw err;
            res.render('todo', { todos: data });
        });
    });

    app.post('/todo', urlencodedParser, function (req, res) {
        //get data from view and add it to mongo db
        var newTodo = Todo(req.body).save(function (err, data) {
            if (err) throw err;
            res.json(data);
        })
    });

    app.delete('/todo/:item', function (req, res) {
        //delete the requested item from mongoDB
        Todo.find({ item: req.params.item.replace(/\-/g, " ") }).remove(function (err, data) {
            if (err) throw err;
            res.json(data);
        });
        // data = data.filter(function (todo) {
        //     return todo.item.replace(/ /g, '-') !== req.params.item;
        // });
        // res.json(data);
    });
};