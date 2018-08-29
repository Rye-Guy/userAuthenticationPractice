const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res, next) =>{
   return res.sendFile(path.join(__dirname + '/public/index.html'));
});

router.post('/', (res, req, next)=>{
    
});

module.exports = router;