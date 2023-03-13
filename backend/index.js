//import
const express = require('express');
const cors = require('cors');

//implementasi
const app = express();
app.use(cors());

//endpoint nanti ditambahkan di sini
//endpoint user
const users = require('./routes/users');
app.use("/users", users)

//endpoint login
const login = require('./routes/login');
app.use("/login", login)

//endpoint lembur
const lembur = require('./routes/lembur');
app.use("/lembur", lembur)

const reimburse = require('./routes/reimburse');
app.use("/reimburse", reimburse)

const absen = require('./routes/absen');
app.use("/absen", absen)

const pending = require('./routes/pending');
app.use("/pending", pending)

const hr = require('./routes/hr');
app.use("/hr", hr)

const menu = require('./routes/menu');
app.use("/menu", menu)

app.use(express.static(__dirname))

// const { faker } = require("@faker-js/faker");
// const model = require("./models/index");
// const pengumuman = model.pengumuman;
// const xlsx = require('xlsx')
// const generateAnnouncementData = () => {
//   const data = [];

//   for (let i = 0; i < 10; i++) {
//     const announcement = new pengumuman({
//       title: faker.lorem.words(3),
//       description: faker.lorem.paragraphs(3)
//     });

//     data.push({
//       title: announcement.title,
//       description: announcement.description
//     });
//   }

//   return data;
// };

// // // Create Excel file with random announcement data
// const generateExcelFile = () => {
//   const data = generateAnnouncementData();

//   const worksheet = xlsx.utils.json_to_sheet(data);
//   const workbook = xlsx.utils.book_new();
//   xlsx.utils.book_append_sheet(workbook, worksheet, "Announcements");

//   xlsx.writeFile(workbook, "pengumuman.xlsx");
// };

// generateExcelFile();

//run server
app.listen(8080, () => {
    console.log('server run on port 8080')
})
