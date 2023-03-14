const nodemailer =  require('nodemailer');
const scheduler = require('node-schedule');
const multer = require("multer");
//import model
const model = require("../models/index");
const pengumuman = model.pengumuman;
const lembur = model.lembur;
const reimburse = model.reimburse;
const xlsx = require('xlsx')
const path = require("path")
const fs = require("fs")

// Schedule the function to run at midnight every day
const job = scheduler.scheduleJob('0 0 * * *', async () => {
    try {
      const lemburs = await lembur.findAll({
        where: {
          status: 'pending',
        },
      });

      const reimbursement = await reimburse.findAll({
        where: {
          status: 'pending',
        },
      });
  
      if (lemburs.length > 0) {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          secure: false, // true for 465, false for other ports
          auth: {
            user: 'kosonga157@gmail.com',
            pass: 'dhhdorgcrereixsw', // your email password
          },
          tls: {
            rejectUnauthorized: false
          }
        });
  
        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: 'your_email@gmail.com', // sender address
          to: 'jocice8870@orgria.com', // list of receivers
          subject: 'Pending overtime', // Subject line
          text: 'You have pending overtime', // plain text body
          html: '<b>You have pending overtime</b>', // html body
        });
  
        console.log('Message sent: %s', info.messageId);
      } 
      if (reimbursement.length>0){
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            secure: false, // true for 465, false for other ports
            auth: {
              user: 'kosonga157@gmail.com',
              pass: 'dhhdorgcrereixsw', // your email password
            },
            tls: {
                rejectUnauthorized: false
            }
          });
    
          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: 'your_email@gmail.com', // sender address
            to: 'jocice8870@orgria.com', // list of receivers
            subject: 'Pending reimbursement', // Subject line
            text: 'You have pending reimbursement', // plain text body
            html: '<b>You have pending reimbursement</b>', // html body
          });
    
          console.log('Message sent: %s', info.messageId);
      }
    } catch (error) {
      console.log(error);
    }
});

// job.invoke()

const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,"./uploads")
    },
    filename: (req,file,cb) => {
        cb(null, "file-" + Date.now() + path.extname(file.originalname))
    },
    limits: {
      fileSize: 5000000,
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(xlsx)$/)) {
        return cb(new Error("Please upload an excel file"));
      }
      cb(undefined, true);
    },
})
let upload = multer({storage: storage})

const postAnnoun = async (req, res) => {
  try {
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    const announcementPromises = sheetData.map(async (data) => {
      const announcement = await pengumuman.create({
        ...data,
      });
      return announcement;
    });
    const announcements = await Promise.all(announcementPromises);
    res.send(announcements);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
}

const getPengumuman = async (req, res) => {
  try {
    const announcement = await pengumuman.findAll();
    res.status(200).json(announcement);
  } catch (error) {
    console.log(error);
    res.send({
      status: false,
      message: error,
    });
  }
};

const getPengumumanById = async (req, res) => {
  try {
    const announcement = await pengumuman.findAll({
      where: {
        id_pengumuman: req.params.id,
      }});
    res.status(200).json(announcement);
  } catch (error) {
    console.log(error);
    res.send({
      status: false,
      message: error,
    });
  }
}

const updatePengumuman = async (req, res) => {
  try {
    let data = {
      title: req.body.title,
      description: req.body.description
    };
    await pengumuman.update(data, {
      where: {
        id_pengumuman: req.params.id,
      },
    });
    res.status(201).json({ msg: "Pengumuman Updated" });
  } catch (error) {
      res.status(400).json({message: error.message});
  }
}

const deletePengumuman = async (req, res) => {
  try {
    await pengumuman.destroy({
      where: {
        id_pengumuman: req.params.id,
      },
    });
    res.status(200).json({ msg: "Pengumuman Deleted" });
  } catch (error) {
    console.log(error);
    res.send({
      status: false,
      message: error,
    });
  }
};
module.exports={postAnnoun, getPengumuman, upload, deletePengumuman, updatePengumuman, getPengumumanById}
