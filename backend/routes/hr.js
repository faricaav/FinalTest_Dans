//import library
const express = require('express');
const bodyParser = require('body-parser');

//implementasi library
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const {upload, postAnnoun, getPengumuman, updatePengumuman, deletePengumuman, getPengumumanById } = require('../controllers/hr')
const auth = require('../auth')

app.post('/announcement', auth('hr'), upload.single("file"), postAnnoun)
app.get('/announcement', auth('hr', 'karyawan'), getPengumuman)
app.get('/announcement/:id', auth('hr', 'karyawan'), getPengumumanById)
app.put('/announcement/:id', auth('hr'), updatePengumuman)
app.delete('/announcement/:id', auth('hr'), deletePengumuman)

module.exports=app