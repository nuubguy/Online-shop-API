const express = require('express');
const logger= require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const apps = express();
const users = require('./routes/users');
const wallets = require('./routes/wallet');

mongoose.connect('mongodb://harukanoo:harukanoo2@rest-shop-shard-00-00-jxtdl.mongodb.net:27017,rest-shop-shard-00-01-jxtdl.mongodb.net:27017,rest-shop-shard-00-02-jxtdl.mongodb.net:27017/test?ssl=true&replicaSet=rest-shop-shard-0&authSource=admin&retryWrites=true',{
    useMongoClient:true
})

apps.use(bodyParser.urlencoded({extended:false}));
apps.use(bodyParser.json());

apps.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
  })

        apps.use(logger('dev'));

        apps.use('/user',users);
        apps.use('/wallet',wallets);

        apps.use((req,res,next)=>{
            const err = new Error('Not Found');
            err.status =404;
            next(err);
        });

        apps.use((err,req,res,next)=>{
            const error = apps.get('env')==='development'? err:{};
            const status = err.status || 500;
            
            res.status(status).json({
                error:{
                    message: error.message
                }
            })
        });


module.exports =apps;
