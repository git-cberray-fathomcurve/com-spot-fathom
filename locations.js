const express = require('express');
const router = express();
const mongoose = require('mongoose');
const Location = require('../models/location.js');

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
                    owner: doc.owner,
                    startdate: doc.startdate,
                    _id:doc._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/locations/'+ doc._id
                    }
                }
            })
        };
        //if (docs.length>0){
            res.status(200).json(response);
        // } else {
        //     res.status(404).json({
        //         message:'no entries found'
        //     });
        // }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});

router.post('/',(req, res, next)=>{
    // Instantiate Location from schema in models folder
    const location = new Location({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        owner: req.body.owner,
        startdate: req.body.startdate
    });
    location.save().then(result=>{
        console.log(result);
        res.status(201).json({
            message: 'Created new location successfully',
            createdLocation: {
                name: result.name,
                owner: result.owner,
                startdate: result.startdate,
                _id: result._id,
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