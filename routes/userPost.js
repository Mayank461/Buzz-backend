const userModel = require('../models/userModel');
const router = require('./auth');

const express = require('express').Router();


router.post('/userPost',async(req,res)=>{
    //destrcture
    const {pic_url,caption,user_id} = req.body
    await userModel.updateOne({_id:user_id},{
       $push:{
           posts:{
               $each:[{
                   post_url: pic_url,
                   post_caption: caption 
               }]
           }
       }
   })
})

module.exports =  router;