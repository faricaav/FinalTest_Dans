//import library
const express = require('express');
const bodyParser = require('body-parser');

//implementasi library
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const { 
    getLembur,
    getLemburById,
    getLemburByIdUser,
    postLembur,
    approveLembur,
    rejectLembur,
    deleteLembur } = require("../controllers/lembur")

const auth = require('../auth')

app.get('/', auth('hr'), getLembur);
app.get('/:id', auth('hr'), getLemburById);
app.get('/byUser/:id', auth('hr','karyawan'), getLemburByIdUser);
app.post('/', auth('karyawan'), postLembur);
app.put('/approve/:id', auth('hr'), approveLembur);
app.put('/reject/:id', auth('hr'), rejectLembur);
app.delete('/:id', auth('hr'), deleteLembur);

module.exports = app;