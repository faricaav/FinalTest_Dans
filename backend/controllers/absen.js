//import model
const model = require("../models/index");
const absen = model.absen;

const toISOString = (date) => {
    var tzo = -date.getTimezoneOffset(), 
        dif = tzo>=0?'+':'-',
        pad = function(num){
            var norm = Math.floor(Math.abs(num))
            return (norm<10?'0':'')+norm
        }
    return date.getFullYear()+
        '-'+pad(date.getMonth()+1)+
        '-'+pad(date.getDate())+
        'T'+pad(date.getHours())+
        ':'+pad(date.getMinutes())+
        ':'+pad(date.getSeconds())+
        '.'+pad(date.getMilliseconds())+'Z'
}

const getAbsenByUserId = async (req, res) => {
  try {
    const absenData = await absen.findAll({
      where: {
        id_user: req.params.id,
      },
      include: ["users"],
    });
    res.status(200).json(absenData);
  } catch (error) {
    console.log(error);
    res.send({
      status: false,
      message: error,
    });
  }
};

const clockIn = async (req, res) => {
    try {
        const now = new Date();
        const hour = now.getHours();
        const date = now.getDate();
        if (hour >= 10) {
          res.status(400).json({ message: 'You cannot clock in after 10:00 AM.' });
          return;
        }

        const id_user = req.body.id_user;
        const jam_masuk = req.body.jam_masuk;
        const tanggal = req.body.tanggal;

        await absen.create({ id_user, tanggal,jam_masuk });
        res.status(200).json({ message: `You have successfully clocked in at${jam_masuk} ${now.toLocaleString()}.` });
      } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
      }
}

const clockOut = async (req, res) => {
    try {
        const now = new Date();
        const hour = now.getHours();
        if (hour<=19) {

          let param = {id_absen: req.params.id}
          const check = await absen.findOne({where: param})
          const {jam_keluar} = req.body
          console.log(jam_keluar)
          if (check) {
            await absen.update({jam_keluar}, {where: param});
            res.status(200).json({ message: `You have successfully clocked out at ${now}.` });
          } else {
            res.status(400).json({ message: 'You have not clocked in yet.' });
          }
        } else {
          res.status(400).json({ message: 'You cannot clock out after 7:00 PM.' });
        }
      } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
      }
}

module.exports={ clockIn, clockOut, getAbsenByUserId}
