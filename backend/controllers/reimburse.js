const nodemailer =  require('nodemailer')
//import model
const model = require("../models/index");
const reimburse = model.reimburse;

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

const getReimburse = async (req, res) => {
  try {
    const reimburseData = await reimburse.findAll({include: ["users"]});
    res.status(200).json(reimburseData);
  } catch (error) {
    console.log(error);
    res.send({
      status: false,
      message: error,
    });
  }
};

const getReimburseByIdUser = async (req, res) => {
  try {
    const reimburseData = await reimburse.findAll({
      where: {
        id_user: req.params.id,
      },
      include: ["users"],
    });
    res.status(200).json(reimburseData);
  } catch (error) {
    console.log(error);
    res.send({
      status: false,
      message: error,
    });
  }
};

const getReimburseById = async (req, res) => {
  try {
    const reimburseData = await reimburse.findOne({
      where: {
        id_reimburse: req.params.id,
      },
      include: ["users"],
    });
    res.status(200).json(reimburseData);
  } catch (error) {
    console.log(error);
    res.send({
      status: false,
      message: error,
    });
  }
};

const postReimburse = async (req, res) => {
  try {
    let data = {
      id_user: req.body.id_user,
      tanggal: req.body.tanggal,
      nominal: req.body.nominal,
      deskripsi: req.body.deskripsi,
    };
    await reimburse.create(data);
    const Option ={
        from: "akunbaru@gmail.com",
        to : "jocice8870@orgria.com",
        subject: "Pengajuan reimburse",
        text:'Pengajuan reimburse'
    }
    transporter.sendMail(Option, (err, info)=>{
        if (err) {
            console.log(err)
        } else {
            console.log("email has sent" + info.response)
        }
    })
    res.status(201).json({ msg: "Reimburse Created" });
  } catch (error) {
    console.log(error);
    res.send({
      status: false,
      message: error,
    });
  }
};

const approveReimburse = async (req, res) => {
  try {
    let data = {
      status: "approved",
    };
    await reimburse.update(data, {
      where: {
        id_reimburse: req.params.id,
      },
    });
    const reimburseData = await reimburse.findOne({
      where: {
        id_reimburse: req.params.id,
      },
      include: ["users"],
    });
    const Option ={
      from: "akunbaru@gmail.com",
      to : reimburseData.users.email,
      subject: "Approved reimburse",
      text:'Approved reimburse'
    }
    transporter.sendMail(Option, (err, info)=>{
        if (err) {
            console.log(err)
        } else {
            console.log("email has sent" + info.response)
        }
    })
    res.status(201).json({ msg: "Reimburse Updated" });
  } catch (error) {
    console.log(error);
    res.send({
      status: false,
      message: error,
    });
  }
};

const rejectReimburse = async (req, res) => {
  try {
    let data = {
      status: "reject",
    };
    await reimburse.update(data, {
      where: {
        id_reimburse: req.params.id,
      },
    });
    const reimburseData = await reimburse.findOne({
      where: {
        id_reimburse: req.params.id,
      },
      include: ["users"],
    });
    const Option ={
      from: "akunbaru@gmail.com",
      to : reimburseData.users.email,
      subject: "Reject reimburse",
      text:'Reject reimburse'
    }
    transporter.sendMail(Option, (err, info)=>{
        if (err) {
            console.log(err)
        } else {
            console.log("email has sent" + info.response)
        }
    })
    res.status(201).json({ msg: "Reimburse Updated" });
  } catch (error) {
    console.log(error);
    res.send({
      status: false,
      message: error,
    });
  }
};

const deleteReimburse = async (req, res) => {
  try {
    await reimburse.destroy({
      where: {
        id_reimburse: req.params.id,
      },
    });
    res.status(200).json({ msg: "Reimburse Deleted" });
  } catch (error) {
    console.log(error);
    res.send({
      status: false,
      message: error,
    });
  }
};

module.exports = {
  getReimburse,
  getReimburseById,
  getReimburseByIdUser,
  postReimburse,
  approveReimburse,
  rejectReimburse,
  deleteReimburse
};
