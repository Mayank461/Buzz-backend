const userModel = require('../models/userModel');
const router = require('./auth');

const express = require('express').Router();


router.get('/getUser',async(req,res)=>{
    const user =await userModel.find();
    res.send(user);

})

module.exports =  router;