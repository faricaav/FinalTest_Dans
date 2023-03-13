const md5 = require('md5');
//import model
const model = require('../models/index');
const user = model.users

const getUsers = async (req, res) => {
    try{
        const usersData = await user.findAll()
        res.status(200).json(usersData)
    }catch(error){
        console.log(error)
        res.send({
          status: false,
          message: error
        })
    }
}

const getUserById = async (req, res) => {
    try{
        const usersData = await user.findOne({
            where:{
                id_user: req.params.id
            }
        });
        res.status(200).json(usersData)
    }
    catch(error){
        console.log(error)
        res.send({
          status: false,
          message: error
        })
    };
}

const postUser = async (req, res) => {
    let data = {
        name : req.body.name,
        email : req.body.email,
        password : md5(req.body.password),
        role: req.body.role
    }
    try{
        await user.create(data)
        res.status(201).json({msg: "User Created"});
    }
    catch(error){
        console.log(error)
        res.send({
          status: false,
          message: error
        })
    };
}

const putUser = async (req, res) => {
    try{
        let data = {
            name : req.body.name,
            email : req.body.email,
            password : md5(req.body.password),
            role: req.body.role
        }
        await user.update(data, {where:{
            id_user: req.params.id
        }})
        res.status(201).json({msg: "User Updated"});
    }
    catch(error){
        console.log(error)
        res.send({
          status: false,
          message: error
        })
    };
}

const deleteUser = async(req, res)=> {
    try{
        await user.destroy({
            where:{
                id_user: req.params.id
            }
        });
        res.status(200).json({msg: "User Deleted"})
    }
    catch(error){
        console.log(error)
        res.send({
          status: false,
          message: error
        })
    };
}

module.exports = {getUsers, getUserById, postUser, putUser, deleteUser}