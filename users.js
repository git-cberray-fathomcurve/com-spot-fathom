const express = require('express');
const router = express();
const mongoose = require('mongoose');
const User = require('../models/user.js');

router.get('/',(req, res, next)=>{
    User.find()
    .select('_id name password startdate')
    .exec()
    .then(docs=>{
        const response = {
            count: docs.length,
            users: docs.map(doc=>{
                return{
                    name: doc.name,
                    password: doc.password,
                    lastlogin: doc.lastlogin,
                    friend: doc.friend,
                    startdate: doc.startdate,
                    _id:doc._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/users/'+ doc._id
                    }
                }
            })
        };
        res.status(200).json(response);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});

router.post('/',(req, res, next)=>{
    // Instantiate User from schema in models folder
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        password: req.body.password,
        lastlogin: req.body.lastlogin,
        friend: req.body.friend,
        startdate: req.body.startdate
    });
    user.save().then(result=>{
        console.log(result);
        res.status(201).json({
            message: 'Created new user successfully',
            createdUser: {
                name: result.name,
                password: result.password,
                lastlogin: result.lastlogin,
                friend: result.friend,
                startdate: result.startdate,
                _id: result._id,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/users/' + result._id
                }
            }
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});

router.get('/:userId',(req, res, next)=>{
    const id=req.params.userId;
    User.findById(id)
        .exec()
        .then(doc=>{
            console.log('from database', doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message:'User ID not found' });
            }
        })
        .catch(err=> {
            console.log(err);
            res.status(500).json({error:err});
        });
});

router.patch('/:userId',(req, res, next)=>{
    const id=req.params.userId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName]=ops.value;
    }
    User.updateOne({_id:id},{$set: updateOps})
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json(result)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/:userId',(req, res, next)=>{
    const id=req.params.userId;
    User.remove({_id:id})
        .exec()
        .then(result=>{
            res.status(200).json(result);
        })
        .catch(err=> {
            console.log(err);
            res.status(500).json({error:err});
        });
});

module.exports = router;