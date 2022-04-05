const userModel = require('../models/userModel');
const router = require('./auth');

const express = require('express').Router();


router.post('/updateUser/:id',async(req,res)=>{
    const id = req.params['id'];
    const { firstname,lastname,designation,website,gender,birthday,city,state,zip} = req.body;
    const findUser =  await userModel.findById(id);
    const record = await userModel.updateOne({ _id: id }, {
        $set: {

            firstname: firstname,
            lastname: lastname,
            designation: designation,
            website: website,
            gender: gender,
            birthday:birthday,
            city:city,
            state:state,
            zip:zip
        }
    });
    console.log("data updated")

})

module.exports =  router;