import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {format} from 'date-fns';

export default function PostPage(){
    const [postInfo, setPostInfo] = useState(null);
    const settings = require('../setting.json');
    const {id} = useParams();

    useEffect(()=>{
        fetch(settings.urlApi+'/post/'+id).then(response => {
            response.json().then(postInfo=>{
                setPostInfo(postInfo);
            })
        });
    }, [])

    if(!postInfo) return '';

    return(
        <div className="post-page">
            <h1>{postInfo.title}</h1>
            <time>{format(new Date(postInfo.createdAt),'yyyy-MM-dd')}</time>
            <div className="author"> @{postInfo.author.userName}</div>
            <div className="image">
                <img src={`${settings.urlApi}/${postInfo.cover}`} alt=''/>
            </div>
            
            <div className="content" dangerouslySetInnerHTML={{__html:postInfo.content}}></div>
        </div>
    );
}