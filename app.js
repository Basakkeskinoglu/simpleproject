
const express=require('express');
const app=express();

const errorMiddleware = require('../api/middleware/error.middleware');

app.use(errorMiddleware);

module.exports=app;