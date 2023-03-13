//import library
const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5');

//implementasi library
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import model
const model = require('../models/index');
const user = model.users

const jwt = require("jsonwebtoken")
const SECRET_KEY = "secret"

const login = async (req, res) => {
    try{
        let data = {
            email : req.body.email,
            password : md5(req.body.password)
        }
        const resultUser = await user.findOne({where: data})
        if (resultUser){
            let payload = JSON.stringify(resultUser)
            // generate token
            let token = jwt.sign(payload, SECRET_KEY)
            res.json({
                logged: true,
                data: resultUser,
                token: token
            })
        } else{
            res.json({
                logged: false,
                message: "Invalid username or password"
            })
        }
    }
    catch(error){
        console.log(error)
        res.send({
          status: false,
          message: error
        })
    };
}

module.exports = {login}