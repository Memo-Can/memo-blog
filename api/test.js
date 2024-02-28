const express = require('express');
const app=express();
const settings = require('../client/src/setting.json');


app.get('/test', function (req, res) {
  
    console.log(settings.connectionMongo);
    res.send('Hello World 23')
});
app.listen(5000)
