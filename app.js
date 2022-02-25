
const express=require('express');
const app=express();

const errorMiddleware = require('./api/middleware/errorHandlingMiddleware');
const simpleRoute=require('./api/routes/simpleRouter')

app.use(errorMiddleware);
app.use('/simpleText',simpleRoute);

module.exports=app;