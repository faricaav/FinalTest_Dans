//import library
const express = require('express');
const bodyParser = require('body-parser');

//implementasi library
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const {getLemburPending} = require('../controllers/pending')
const {getReimbursePending} = require('../controllers/pending')

app.get('/lembur', auth('hr'), getLemburPending);
app.get('/reimburse', auth('hr'), getReimbursePending);

module.exports=app