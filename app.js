const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');

const app =express();
app.use(express.json());

const db = config.MONGODB_URI;
mongoose.connect(db,{useNewUrlParser:true,useFindAndModify:false})
    .then(()=>console.log('MongoDB connected successfully!'))
     .catch(err=>console.log(err))

app.use('/customers',require('./routes/customers'));
app.use('/users',require('./routes/users'))

app.listen(config.PORT,()=>console.log(`Server started on port ${config.PORT}`))