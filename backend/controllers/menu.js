//import model
const model = require("../models/index");
const menu = model.menu;

const getMenuUser = async (req, res) => {
    try {
      const menuUser = await menu.findAll({where: {
        role: 'karyawan',
      }});
      res.status(200).json(menuUser);
    } catch (error) {
      console.log(error);
      res.send({
        status: false,
        message: error,
      });
    }
};

const getMenuHr = async (req, res) => {
    try {
      const menuHr = await menu.findAll({where: {
        role: 'hr',
      }});
      res.status(200).json(menuHr);
    } catch (error) {
      console.log(error);
      res.send({
        status: false,
        message: error,
      });
    }
};

const postMenu = async (req, res) => {
    let data = {
        name : req.body.name,
        path : req.body.path,
        role: req.body.role
    }
    try{
        await menu.create(data)
        res.status(201).json({msg: "Menu Created"});
    }
    catch(error){
        console.log(error)
        res.send({
          status: false,
          message: error
        })
    };
}

module.exports={getMenuUser, getMenuHr, postMenu}