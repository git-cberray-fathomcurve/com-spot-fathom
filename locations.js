const express = require('express');
const router = express();
const mongoose = require('mongoose');
const Location = require('../models/location.js');
const user = require('../models/user.js');
const User = require('../models/user.js');

router.get('/',(req, res, next)=>{
    Location.find()
    .select('_id name owner startdate')
    .exec()
    .then(docs=>{
        const response = {
            count: docs.length,
            locations: docs.map(doc=>{
                return{
                    name: doc.name,
                    user: doc.user,
                    spot: doc.spot,
                    friend: doc.friend,
                    _id:doc._id,
                    note: doc.note,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/locations/'+ doc._id
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
    // Check if there is a valid user id before entry
    
    User.findById(req.body.userId)//uses static User
    .then(user=>{
        // when no user is found we send an error and end process with return statement
        if(!user){
            //run event to build new user creation here
            return res.status(404).json({
                message: 'User not found'
            });
        } else {//we found a valid user, create location object
            const location = new Location({
                _id: mongoose.Types.ObjectId(),
                name: req.body.name,
                user: req.body.userId,
                spot: req.body.spot,
                friend: req.body.friend,
                note: req.body.note
            });
            return location.save()//returns the promise
        }
    })
    // Now create location joined to user
    .then(result=>{
        console.log(result);
        res.status(201).json({
            message: 'Created new location successfully',
            createdLocation: {
                name: result.name,
                friend: result.friend,
                spot: result.spot,
                _id: result._id,
                user: result.user,
                note: result.note,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/locations/' + result._id
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

    // Instantiate Location from schema in models folder
    // const location = new Location({
    //     _id: new mongoose.Types.ObjectId(),
    //     name: req.body.name,
    //     spot: req.body.spot,
    //     friend: req.body.friend,
    //     user: req.body.userId,
    //     note: req.body.note
    // });
    // location.save().then(result=>{
    //     console.log(result);
    //     res.status(201).json({
    //         message: 'Created new location successfully',
    //         createdLocation: {
    //             name: result.name,
    //             friend: result.friend,
    //             spot: result.spot,
    //             _id: result._id,
    //             user: User._id,
    //             note: result.note,
    //             request: {
    //                 type: 'GET',
    //                 url: 'http://localhost:3000/locations/' + result._id
    //             }
    //         }
    //     });
    // })
    // .catch(err=>{
    //     console.log(err);
    //     res.status(500).json({
    //         error:err
    //     });
    // });
});

router.get('/:locationId',(req, res, next)=>{
    const id=req.params.locationId;
    Location.findById(id)
        .exec()
        .then(doc=>{
            console.log('from database', doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message:'Location ID not found' });
            }
        })
        .catch(err=> {
            console.log(err);
            res.status(500).json({error:err});
        });
});

router.patch('/:locationId',(req, res, next)=>{
    const id=req.params.locationId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName]=ops.value;
    }
    Location.updateOne({_id:id},{$set: updateOps})
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

router.delete('/:locationId',(req, res, next)=>{
    const id=req.params.locationId;
    Location.remove({_id:id})
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