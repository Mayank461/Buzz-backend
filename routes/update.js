const userModel = require('../models/userModel');
const router = require('./auth');

const express = require('express').Router();


router.get('/updateUser',async(req,res)=>{
    res.send('hi');

})

// router.post('/updateUser', async(req,res) => {
     
// })

module.exports =  router;