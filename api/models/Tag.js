const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const TagSchema= new Schema({
    title: String
});

const TagModel = model('Tag',TagSchema);

module.exports= TagModel;