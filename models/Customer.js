const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    balance:{
        type:Number,
        required:true,
        default:0
    }
});

CustomerSchema.plugin(timestamp);

module.exports = mongoose.model('Customer',CustomerSchema);

