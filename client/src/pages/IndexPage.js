import Post from '../Post.js';
import { useEffect, useState } from 'react';

export default function IndexPage(){
    const setting = require('../setting.json');
    const [posts, setPosts]= useState([]);

    useEffect(()=>{
        fetch(setting.urlApi +'/post').then(response=>{
            response.json().then(posts=>{
                setPosts(posts);
            });
        });
    },[]);

    return(
        <>
            {posts.length > 0 && posts.map(post=> (
                <Post key={post._id} {...post}/>
            ))}
        </>
    );
}