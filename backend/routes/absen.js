//import library
const express = require('express');
const bodyParser = require('body-parser');

//implementasi library
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const {clockIn, clockOut, getAbsenByUserId } = require("../controllers/absen")
const auth = require('../auth')

app.post('/clockIn', auth('karyawan','hr'), clockIn);
app.get('/byUser/:id', auth('karyawan','hr'), getAbsenByUserId)
app.put('/clockOut/:id', auth('karyawan','hr'), clockOut);

module.exports = app;