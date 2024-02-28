import {format} from 'date-fns';
import setting from './setting.json'

export default function Post({title,summary,cover,createdAt,author}){
    return(
        <div className="post">
            <div className="image">
                <img src={setting.urlApi+'/'+cover} alt=""/>
            </div>
            <div className="texts">
                <h2>{title}</h2>
                <p className="info">
                    <a className="author">{author==null?'':author.userName}</a> 
                    <time>{format(new Date(createdAt),'yyyy-MM-dd')}</time>
                </p>
                <p className="summary"> {summary}</p>
            </div>
        </div>
    );
};