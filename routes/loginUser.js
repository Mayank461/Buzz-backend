const userModel = require('../models/userModel');
const router = require('./auth');
const bcrypt = require('bcrypt');

const express = require('express').Router();


let authenticate = false;
router.post('/loginUser',async(req,res)=>{

    const { userEmail,userPassword} = req.body;
    console.log(userEmail);
    console.log(userPassword);

    const salt = await bcrypt.genSalt(10);
    const passwordHashing = await bcrypt.hash(userPassword, salt);
    
    const findUser =  await userModel.findOne({email:userEmail});
    if(findUser === null)
    {
        const regUser = new userModel({

            email: userEmail,
            password: passwordHashing,
         
        })

        await regUser.save().then((result) => {
            console.log('data saved successfully')


        }).catch(err => console.log(err));
    }
    else{
        console.log(' found')
        if(findUser.password ===null)
        {
            console.log("ok")
        }
        else{
            const validPassword = await bcrypt.compare(userPassword, findUser.password)
            if(validPassword)
            {
                console.log('logged in');
                // authenticate = true;
              
            }
            else{
                console.log('wrong credentail');
            }
        }
    }

})
router.get('/loginUser',async(req,res)=>{
    // const user =await userModel.find();
    res.send(authenticate);


})
module.exports =  router;