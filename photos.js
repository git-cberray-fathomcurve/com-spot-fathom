const express = require('express');
const router = express();
const mongoose = require('mongoose');
const Photo = require('../models/photo.js');
const location = require('../models/location.js');
const Location = require('../models/location.js');


router.get('/',(req, res, next)=>{
    Photo.find()
    .select('_id name location Image')
    .exec()
    .then(docs=>{
        const response = {
            count: docs.length,
            photos: docs.map(doc=>{
                return{
                    name: doc.name,
                    location: doc.location,
                    _id:doc._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/photos/'+ doc._id
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
    // Check if there is a valid location id before entry
    
    Location.findById(req.body.locationId)//uses static Location
    .then(location=>{
        // when no location is found we send an error and end process with return statement
        if(!location){
            //run event to build new location creation here
            return res.status(404).json({
                message: 'Location not found'
            });
        } else {//we found a valid location, create photo object
            const photo = new Photo({
                _id: mongoose.Types.ObjectId(),
                name: req.body.name,
                location: req.body.locationId
            });
            return photo.save()//returns the promise
        }
    })
    // Now create photo joined to location
    .then(result=>{
        console.log(result);
        res.status(201).json({
            message: 'Created new photo successfully',
            createdPhoto: {
                name: result.name,
                _id: result._id,
                location: result.location,

///    HERE WE NEED TO USE CALL OF ASYNC CONVERTIGAGE     /////



                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/photos/' + result._id
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

router.get('/:photoId',(req, res, next)=>{
    const id=req.params.photoId;
    Photo.findById(id)
        .exec()
        .then(doc=>{
            console.log('from database', doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message:'Photo ID not found' });
            }
        })
        .catch(err=> {
            console.log(err);
            res.status(500).json({error:err});
        });
});

router.patch('/:photoId',(req, res, next)=>{
    const id=req.params.photoId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName]=ops.value;
    }
    Photo.updateOne({_id:id},{$set: updateOps})
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

router.delete('/:photoId',(req, res, next)=>{
    const id=req.params.photoId;
    Photo.remove({_id:id})
        .exec()
        .then(result=>{
            res.status(200).json(result);
        })
        .catch(err=> {
            console.log(err);
            res.status(500).json({error:err});
        });
});

//Function for conversion of image for use in mongo
const convertImage = async (event) => {
    try {
    const convertedImage = await Convert(imageFile)
    if( convertedImage ){
    console.log(convertedImage);
    } else{
        console.log('The file is not in format of image/jpeg or image/png')
    }
} 
catch (error) {
    console.warn(error.message)
    }
}


module.exports = router;