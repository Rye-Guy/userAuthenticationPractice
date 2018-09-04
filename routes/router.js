const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) =>{
   return res.sendFile(path.join(__dirname + '/public/index.html'));
});

router.post('/', (req, res)=>{
    
    if(req.body.password !== req.body.passwordConf){
        let err = new Error('Passwords do not match!');
        err.status = 400; 
        res.send('passwords do not match');
    }
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
                    req.session.userId = user._id;
                    return res.redirect('/');
                }
            });
       }else if(req.body.logemail && req.body.logpassword){
           User.authenticate(req.body.logemail, req.body.logpassword, (error, user) =>{
            if(error || !user){
                
                let err = new Error('Wrong email and/or password');
                err.status = 401; 
            }else{
                console.log(user);
                req.session.userId = user._id;
                return res.redirect('/');
            }
           });
       }else{
           let err = new Error('All Fields Required');
           err.status = 400;
           return res.json(userData);
       }
});

module.exports = router;