
const nodemailer =  require('nodemailer')

//import model
const model = require("../models/index");
const lembur = model.lembur;
const user = model.users;

const transporter = nodemailer.createTransport({
    service:"gmail",
    host: 'smtp.gmail.com',
    secure:true,
    auth: {
      user: 'kosonga157@gmail.com',
      pass: 'dhhdorgcrereixsw',
    },
    tls: {
        rejectUnauthorized: false
    }
  });
  
  transporter.verify().then(console.log).catch(console.error);

const getLembur = async (req, res) => {
  try {
    const lemburData = await lembur.findAll({include: ["users"]});
    res.status(200).json(lemburData);
  } catch (error) {
    console.log(error);
    res.send({
      status: false,
      message: error,
    });
  }
};

const getLemburByIdUser = async (req, res) => {
  try {
    const lemburData = await lembur.findAll({
      where: {
        id_user: req.params.id,
      },
      include: ["users"],
    });
    res.status(200).json(lemburData);
  } catch (error) {
    console.log(error);
    res.send({
      status: false,
      message: error,
    });
  }
};

const getLemburById = async (req, res) => {
  try {
    const lemburData = await lembur.findOne({
      where: {
        id_lembur: req.params.id,
      },
      include: ["users"],
    });
    res.status(200).json(lemburData);
  } catch (error) {
    console.log(error);
    res.send({
      status: false,
      message: error,
    });
  }
};

const postLembur = async (req, res) => {
  try {
    let data = {
      id_user: req.body.id_user,
      tanggal: req.body.tanggal,
      alasan: req.body.alasan,
    };
    const usersData = await user.findOne({
      where:{
          id_user: data.id_user
      }
    });
    await lembur.create(data);
    const Option ={
        from: usersData.email,
        to : "jocice8870@orgria.com",
        subject: "Pengajuan lembur",
        text:'Pengajuan lembur'
    }
    transporter.sendMail(Option, (err, info)=>{
        if (err) {
            console.log(err)
        } else {
            console.log("email has sent" + info.response)
        }
    })
    res.status(201).json({ msg: "Lembur Created" });
  } catch (error) {
    console.log(error);
    res.send({
      status: false,
      message: error,
    });
  }
};

const approveLembur = async (req, res) => {
  try {
    let data = {
      status: "approved",
    };
    await lembur.update(data, {
      where: {
        id_lembur: req.params.id,
      },
    });
    const lemburData = await lembur.findOne({
      where: {
        id_lembur: req.params.id,
      },
      include: ["users"],
    });
    const Option ={
      from: "akunbaru@gmail.com",
      to : lemburData.users.email,
      subject: "Approve lembur",
      text:'Approve lembur'
    }
    transporter.sendMail(Option, (err, info)=>{
        if (err) {
            console.log(err)
        } else {
            console.log("email has sent" + info.response)
        }
    })
    res.status(201).json({ msg: "Lembur Updated" });
  } catch (error) {
    console.log(error);
    res.send({
      status: false,
      message: error,
    });
  }
};

const rejectLembur = async (req, res) => {
  try {
    let data = {
      status: "reject",
    };
    await lembur.update(data, {
      where: {
        id_lembur: req.params.id,
      },
    });
    const lemburData = await lembur.findOne({
      where: {
        id_lembur: req.params.id,
      },
      include: ["users"],
    });
    const Option ={
      from: "akunbaru@gmail.com",
      to : lemburData.users.email,
      subject: "Reject lembur",
      text:'Reject lembur'
    }
    transporter.sendMail(Option, (err, info)=>{
        if (err) {
            console.log(err)
        } else {
            console.log("email has sent" + info.response)
        }
    })
    res.status(201).json({ msg: "Lembur Updated" });
  } catch (error) {
    console.log(error);
    res.send({
      status: false,
      message: error,
    });
  }
};

const deleteLembur = async (req, res) => {
  try {
    await lembur.destroy({
      where: {
        id_lembur: req.params.id,
      },
    });
    res.status(200).json({ msg: "Lembur Deleted" });
  } catch (error) {
    console.log(error);
    res.send({
      status: false,
      message: error,
    });
  }
};

module.exports = {
  getLembur,
  getLemburById,
  getLemburByIdUser,
  postLembur,
  approveLembur,
  rejectLembur,
  deleteLembur
};
