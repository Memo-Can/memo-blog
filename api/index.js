const express = require('express');
const cors = require('cors');
const database = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const app=express();
const jwt = require('jsonwebtoken');
const salt =bcrypt.genSaltSync(10); 
const setting = require('../client/src/setting.json');
const cookieParser = require('cookie-parser');

app.use(cors({credentials:true, origin:setting.urlClient}));
app.use(express.json());
app.use(cookieParser());

database.connect(setting.connectionDb);

app.post('/register', async(req,res)=>{
    const {userName,password}= req.body;
    try{
        const user =  await User.create({
            userName, 
            password: bcrypt.hashSync(password,salt),
        });
        res.json(user);
    }
    catch(e){
        res.status(400).json(e);
    }
});

app.post('/login', async (req,res)=>{
    const{userName,password} = req.body;
    const user = await User.findOne({userName});

    if(!user){
        res.status(400).json('User can not found.');
    }

    const result = bcrypt.compareSync(password, user.password);
    if(result){
        jwt.sign({userName,id:user._id},setting.secret,{},(err,token)=>{
            if(err) throw err;
            res.cookie('token',token).json('ok');
        });
    }
    else{
        res.status(400).json('Wrong user or pass.');
    }
});

app.get('/profile', (req,res )=>{
    const{token}= req.cookies;
    jwt.verify(token,setting.secret,{},(err,info)=>{
        if(err) throw err;
        res.json(info);
    });
});

app.post('/logout', (req,res)=>{
  res.cookie('token','').json('ok');
});

app.listen(4000);
