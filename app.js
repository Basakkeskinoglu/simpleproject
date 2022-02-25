
const express=require('express');
const app=express();
const errorMiddleware = require('./api/middleware/errorHandlingMiddleware');
const router=require('./api/routes/simpleRouter.js');


app.use(errorMiddleware);
app.use('/',router);


module.exports=app;