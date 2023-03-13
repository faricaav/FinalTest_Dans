//import library
const express = require('express');
const bodyParser = require('body-parser');

//implementasi library
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const { getMenuUser, getMenuHr, postMenu} = require("../controllers/menu")
const auth = require('../auth')

app.get('/karyawan', auth('karyawan'), getMenuUser);
app.get('/hr', auth('hr'), getMenuHr);
app.post('/', postMenu)

module.exports = app;