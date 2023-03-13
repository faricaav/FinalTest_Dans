//import library
const express = require('express');
const bodyParser = require('body-parser');

//implementasi library
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const { getUsers, getUserById, postUser, putUser, deleteUser } = require("../controllers/users")
const auth = require('../auth')

app.get('/', auth('hr'), getUsers);
app.get('/:id', auth('hr'), getUserById);
app.post('/', postUser);
app.put('/:id', auth('hr'), putUser);
app.delete('/:id', auth('hr'), deleteUser);

module.exports=app