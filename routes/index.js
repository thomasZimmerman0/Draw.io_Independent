const express = require('express');
const router = express.Router();
const auth = require('../auth')

router.get('/', (req,res) => {

    if(req.isAuthenticated()){    

        res.render('index', {
        username: req.user.userName,
        user : req.user,
        loggedIn: true
    })}

    res.render('index', {
        user: false})

    
})



module.exports = router;

