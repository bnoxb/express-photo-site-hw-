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
        
    });
});

router.get('/:id', (req, res)=>{
    Users.findById(req.params.id, (err, user)=>{
        if(err){
            res.send(err);
        }else {
            res.render('./user/show.ejs',{
                user: user
            });
        }
    });
});

router.get('/:id/edit', (req, res)=>{
    Users.findById(req.params.id, (err, user)=>{
        if(err){
            res.send(err);
        } else {
            res.render('./user/edit.ejs', {
                user: user
            });
        }
    });
});

router.put('/:id', (req, res)=>{
    Users.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, user)=>{
        if(err){
            res.send(err);
        }else {
            res.redirect('/users');
        }
    })
})
module.exports = router;