const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const CategorySchema= new Schema({
    title: String,
    subtitles: String,
});

const CategoryModel = model('Category',CategorySchema);

module.exports= CategoryModel;