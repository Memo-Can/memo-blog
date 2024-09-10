const express = require('express');
const cors = require('cors');
const database = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');
const Tag = require('./models/Tag');
//onst Category = require('./models/Category');
const bcrypt = require('bcryptjs');
const app=express();
const jwt = require('jsonwebtoken');
const salt = bcrypt.genSaltSync(10); 
const setting = require('../client/src/setting.json');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({dest: 'uploads/'});
const fs = require('fs');
const { Console } = require('console');

app.use(cors({credentials:true, origin:setting.urlClient}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname+'/uploads'));

database.connect(setting.connectionDb);

// app.post('/register', async(req,res)=>{
//     const {userName,password}= req.body;
//     try{
//         const user =  await User.create({
//             userName, 
//             password: bcrypt.hashSync(password,salt),
//         });
//         res.json(user);
//     }
//     catch(e){
//         console.log(e);
//         res.status(400).json(e);
//     }
// });

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
			// res.cookie('token',token).json('ok');
			res.cookie('token',token).json({
					id: user._id,
					userName,
			});
		});
	}
	else{
		res.status(400).json('Wrong user or pass.');
	}
});

app.get('/profile', (req, res )=>{
	const{token}= req.cookies;
	jwt.verify(token,setting.secret,{},(err,info)=>{
		// if(err) throw err;
		// res.json(info);
		if(!err)
				res.json(info)
	});
});

app.post('/logout', (req,res)=>{
    res.cookie('token','').json('ok');
});

app.post('/post',uploadMiddleware.single('file'),  async(req, res)=>{
	let newPath='';
	if(req.file){
		const {originalname,path}= req.file;
		const parts = originalname.split(".");
		const ext = parts[parts.length -1];
		newPath =path+'.'+ext
		fs.renameSync(path,newPath);
	}

	console.log(req.body);
	const{token}= req.cookies;
	jwt.verify(token,setting.secret,{}, async(err, info)=>{
		if(err) throw err;
		const{title, summary, tag, content}=req.body;
		const postDoc= await Post.create({
			title,
			summary,
			tag,
			content,
			author: info.id,
			cover: newPath, 
		});
		TagCreator(tag);
		res.json(postDoc);
	});
});

app.put('/post',uploadMiddleware.single('file'), async (req,res) => {
    let newPath = null;
    if (req.file) {
        const {originalname,path} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path+'.'+ext;
        fs.renameSync(path, newPath);
    }
  
    const {token} = req.cookies;
    jwt.verify(token, setting.secret, {}, async (err,info) => {
      if (err) throw err;
      const {id,title,tag,summary,content} = req.body;
      const postDoc = await Post.findById(id);
      const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
      if (!isAuthor) {
        return res.status(400).json('you are not the author');
      }
        await Post.findByIdAndUpdate(id,{
            title,
            summary,
            tag,
            content,
            cover: newPath ? newPath : postDoc.cover,
        });
            
        TagCreator(tag);
  
      res.json(postDoc);
    });
});

app.get('/post', async (req, res)=>{
	res.json(await GetDataBy(req,res));
});

// app.get('/post/:search',  async (req, res)=>{
//   res.json( await GetDataBy(req,res));
// });

app.get('/post/:id', async(req, res)=>{
    const {id} = req.params;
    const postDoc =await Post.findById(id).populate('author',['userName']);
    res.json(postDoc);
});

function TagCreator(tag){
    if(tag){
        let tags = tag.replace(/\s/g, '').split(',');
        tags.forEach(async tag => {
            const result = await Tag.findOne({title: tag.toLowerCase()});
            if(!result){
                await Tag.create({ title: tag.toLowerCase()});
            }
        }); 
    }
}

async function GetDataBy(req,res){
	const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = 3; // Number of posts per page
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
	let posts=[];

	if(req.query.search){
		const regex = new RegExp(req.query.search, 'i'); // 'i' makes the search case-insensitive
    const query = {
      $or: [
        { title: { $regex: regex } }
      ]
    };
		posts= await Post.find(query).select('title summary createdAt');
	}
	else{
		posts = await Post.find().select('title summary createdAt')
					.populate('author',['userName'])
					.sort({createdAt:-1})
	}

  const paginatedPosts = posts.slice(startIndex, endIndex);

	return {
		page,
		totalPosts: posts.length,
		totalPages: Math.ceil(posts.length / limit),
		posts: paginatedPosts,
	};
}

app.listen(4000);
