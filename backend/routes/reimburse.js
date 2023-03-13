//import library
const express = require('express');
const bodyParser = require('body-parser');

//implementasi library
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const { 
    getReimburse,
    getReimburseById,
    getReimburseByIdUser,
    postReimburse,
    approveReimburse,
    rejectReimburse,
    deleteReimburse } = require("../controllers/reimburse")

const auth = require('../auth')

app.get('/', auth('hr'), getReimburse);
app.get('/:id', auth('hr'), getReimburseById);
app.get('/byUser/:id', auth('hr','karyawan'), getReimburseByIdUser);
app.post('/', auth('karyawan'), postReimburse);
app.put('/approve/:id', auth('hr'), approveReimburse);
app.put('/reject/:id', auth('hr'), rejectReimburse);
app.delete('/:id', auth('hr'), deleteReimburse);

module.exports = app;