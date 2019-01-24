const express = require('express');
const router = express.Router();
const Users = require('../models/User');
const Photos = require('../models/Photo');

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
});

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
    Users.findById(req.params.id, (err, foundUser)=>{
        if(err){
            res.send(err);
        } else {
            console.log('found user ' + foundUser);
            res.render('./user/edit.ejs', {
                user: foundUser
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

router.delete('/:id', (req, res)=>{
    Users.findByIdAndRemove(req.params.id, (err, user)=>{
        if(err){
            res.send(err);
        } else {
            const photoIds = [];
            for (let i = 0; i < user.images.length; i++){
                photoIds.push(user.images[i]._id);
            }
            Photos.deleteMany({_id: {$in: photoIds}}, (err, data)=>{
                console.log(user);
                res.redirect('/users');
            });
        }
    });
});

module.exports = router;