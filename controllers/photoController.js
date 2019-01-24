const express = require('express');
const router = express.Router();
const Photos = require('../models/Photo');
const Users = require('../models/User');

router.get('/', (req,res)=>{
    Photos.find({}, (err, photos)=>{
        res.render('./photo/index.ejs',{
            photos: photos
        });
    });
});

router.get('/new', (req,res)=>{
    Users.find({}, (err, users)=>{
        if(err){
            res.send(err);
        }else{
            res.render('./photo/new.ejs', {
                users: users
            });
        }
    })
    
});

router.post('/', (req, res)=>{
    Users.findById(req.body.userId, (err, foundUser)=>{
        req.body.userName = foundUser.name;
        Photos.create(req.body, (err, photo)=>{
            if(err){
                res.send(err);
            }else{
                foundUser.images.push(photo);
                foundUser.save((err, data)=>{
                    console.log(photo);
                    res.redirect('/photos');
                });
            }
        });
    });
});

router.get('/:id', (req, res)=>{
    Photos.findById(req.params.id, (err, photo)=>{
        if(err){
            res.send(err);
        }else{
            res.render('./photo/show.ejs',{
                photo: photo
            })
        }
    })
})

router.get('/:id/edit', (req, res)=>{
    Photos.findById(req.params.id, (err, photo)=>{
        if(err){
            res.send(err);
        } else {
            Users.find({}, (err, users)=>{
                if(err){
                    res.send(err);
                } else {
                    Users.findOne({'images._id': req.params.id}, (err, foundUser)=>{
                        if(err){
                            res.send(err);
                        } else {
                            console.log(foundUser);
                            res.render('./photo/edit.ejs', {
                                photo: photo,
                                users: users,
                                photoUser: foundUser
                            });
                        }
                    });
                }
            });
        }
    });
});

router.put('/:id', (req, res)=>{
    Users.findOne({'images._id': req.params.id}, (err, foundUser)=>{
        if(err){
            res.send(err);
        } else{
            if(foundUser._id.toString() !== req.body.userId) {
                foundUser.images.id(req.params.id).remove();
                foundUser.save((err, savedFoundUser)=>{
                    Users.findById(req.body.userId, (err, newUser)=>{
                        req.body.userName = newUser.name;
                        Photos.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, photo)=>{
                            if(err){
                                res.send(err);
                            } else {
                                newUser.images.push(photo);
                                newUser.save((err, savedNewUser)=>{
                                    if(err){
                                        res.send(err);
                                    }else{
                                        res.redirect(`/photos/` + req.params.id); 
                                    }    
                                });
                            }
                        
                        });
                    });
                });
            } else {
                foundUser.images.id(req.params.id).remove();
                if(err){
                    res.send(err);
                }else{
                    Photos.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, photo)=>{
                        if(err){
                            res.send(err);
                        } else {
                            foundUser.images.push(photo);
                            foundUser.save((err, data)=>{
                                res.redirect('/photos/' + req.params.id);
                            });
                        };
                    });
                }
            }
        }
    });
});

router.delete('/:id', (req, res)=>{
    Photos.findByIdAndRemove(req.params.id, (err, removedPhoto)=>{
        if(err){
            res.send(err);
        }else{
            Users.findOne({'images._id': req.params.id}, (err, foundUser)=>{
                if(err){
                    res.send(err);
                }else{
                    foundUser.images.id(req.params.id).remove();
                    foundUser.save((err, data)=>{
                        if(err){
                            res.send(err);
                        }else{
                            console.log('deleted ' + removedPhoto);
                            res.redirect('/photos');
                        }
                    });
                }
            });
        }
    });
});

module.exports = router;