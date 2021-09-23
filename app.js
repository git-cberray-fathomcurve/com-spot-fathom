const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// ROUTE DECLARATIONS
const locationRoutes=require('./api/routes/locations');
const userRoutes=require('./api/routes/users');

// DATABASE CONSTRUCT
mongoose.connect('mongodb+srv://' + 
    process.env.MONGO_ATLAS_USER + ':' + 
    process.env.MONGO_ATLAS_PW + 
    '@cluster0.u12zz.mongodb.net/SPOTS?retryWrites=true&w=majority');
    {
        useMongoClient: true
    }

// MIDDLEWARE
// --LOGGING
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// --CORS Handling
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers',
    'Origin,X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH');
        return res.status(200).json({});
    }
    next();
});


// --ROUTES
app.use('/locations', locationRoutes);
app.use('/users', userRoutes);

// --ERROR HANDLING
app.use((res, req, next)=>{
    const error = new Error('Not found');
    error.status=404;
    next(error);
});

app.use((error, req, res, next)=>{
    res.status(error.status||500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;