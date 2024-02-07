const express = require('express');
const app=express();
const settings = require('./settings.json');


app.get('/test', function (req, res) {
    debugger;

    console.log(settings.connectionMongo);
    res.send('Hello World 23')
});
app.listen(5000)
