//import model
const model = require("../models/index");
const lembur = model.lembur;
const user = model.users;
const reimburse = model.reimburse;

const getReimbursePending = async (req, res) => {
    try {
        let indicator = { status: "pending" };
        const reimburseData = await reimburse.findAll({
          where: indicator,
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

const getLemburPending = async (req, res) => {
    try {
        let indicator = { status: "pending" };
        const lemburData = await lembur.findAll({
          where: indicator,
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

module.exports={getLemburPending, getReimbursePending}