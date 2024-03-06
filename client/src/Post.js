import {format} from 'date-fns';
import setting from './setting.json'
import { Link } from 'react-router-dom';

export default function Post({_id,title,summary,cover,createdAt,author}){
    return(
        <div className="post" >
            <Link to={`/post/${_id}`}>
                <div className="image">
                    <img src={setting.urlApi+'/'+cover} alt=""/>
                </div>
            </Link>
            <div className="texts">
                <Link to={`/post/${_id}`}>
                    <h2>{title}</h2>
                </Link>
                <p className="info">
                    <a className="author">{author==null?'':author.userName}</a> 
                    <time>{format(new Date(createdAt),'yyyy-MM-dd')}</time>
                </p>
                <p className="summary"> {summary}</p>
            </div>
        </div>
    );
};