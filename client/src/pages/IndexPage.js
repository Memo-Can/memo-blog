import Category from '../components/Category.js';
import Post from '../components/Post';
import { useEffect, useState } from 'react';

export default function IndexPage(){
    const [posts, setPosts]= useState([]);

    useEffect(()=>{
        const setting = require('../setting.json');

        fetch(setting.urlApi +'/post').then(response=>{
            response.json().then(posts=>{
                setPosts(posts);
            });
        });
    
    },[]);

    return(
        <>
            <div className='postIndex' >
            <fieldset>
                        {posts.length > 0 && posts.map(post=> (
                            <Post key={post._id} {...post}/>
                        ))}
                </fieldset>
            </div>
            <div className='categoryIndex'>
                <fieldset>
                        <legend>Categories</legend>
                        <Category/>
                </fieldset>
            </div>
        </>
    );
}