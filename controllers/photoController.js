const express = require('express');
const router = express.Router();
const Photos = require('../models/Photo');

router.get('/', (req,res)=>{
    Photos.find({}, (err, photos)=>{
        res.render('./photo/index.ejs',{
            photos: photos
        });
    });
});

router.get('/new', (req,res)=>{
    res.render('./photo/new.ejs');
});

router.post('/', (req, res)=>{
    Photos.create(req.body, (err, photo)=>{
        if(err){
            res.send(err);
        }else{
            console.log(photo);
            res.redirect('/photos');
        }
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
            res.render('./photo/edit.ejs',{
                photo: photo
            });
        }
    });
});

router.put('/:id', (req, res)=>{
    Photos.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, photo)=>{
        if(err){
            res.send(err);
        } else {
            console.log(photo);
            res.redirect(`/photos/` + req.params.id);
        }
    });
});

router.delete('/:id', (req, res)=>{
    Photos.findByIdAndRemove(req.params.id, (err, removedPhoto)=>{
        if(err){
            res.send(err);
        }else{
            res.redirect('/photos');
        }
    })
})
module.exports = router;