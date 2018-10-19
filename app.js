const express = require('express');
const logger= require('morgan');
const apps = express();


        apps.use(logger('dev'));

        apps.get('/',(req,res,next)=>{
            res.status(200).json({
                message:"you request a page"
            })
        });

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
