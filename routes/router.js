const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) =>{
   return res.sendFile(path.join(__dirname + '/public/index.html'));
});

router.post('/', (req, res)=>{
    if(req.body.email &&
       req.body.username &&
       req.body.password &&
       req.body.passwordConf){
        
            let userData = {
               email: req.body.email,
               username: req.body.username, 
               password: req.body.password,
               passwordConf: req.body.passwordConf
                }
            User.create(userData, (err, user) => {
                if(err){
                    console.log(err)
                }else{
                    return res.redirect('/');
                }
            });
       }
});

module.exports = router;