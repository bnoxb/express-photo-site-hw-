const express = require('express');
const router = express.Router();
const Users = require('../models/User');

// display all the users in a list
router.get('/', (req, res)=>{
    Users.find({}, (err, users)=>{
        res.render('./user/index.ejs', {
            users: users
        });
    });
});

router.get('/new', (req, res)=>{
    res.render('./user/new.ejs');
})

router.post('/', (req, res)=>{
    Users.create(req.body, (err, author)=>{
        if(err){
            res.send(err);
        } else{
            console.log(author);
            res.redirect('/users');
        }
        
    })
})

module.exports = router;