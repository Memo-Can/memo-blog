import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Setting from '../setting.json';
import Editor from "../components/Editor";

export default function EditPost(){
    const[title, setTitle] = useState('');
    const[summary, setSummary] = useState('');
    const[tag, setTag] = useState('');
    const[content, setContent]= useState('');
    const[files, setFiles]= useState('');
    const[cover, setCover]= useState('');
    const[redirect,setRedirect] = useState(false);
    const {id} = useParams();

    useEffect(()=>{
        fetch(`${Setting.urlApi}/post/${id}`)
            .then(response=>{
                response.json().then(postInfo=>{
                    setTitle(postInfo.title);
                    setTag(postInfo.tag);
                    setContent(postInfo.content);
                    setSummary(postInfo.summary);
                });
            });
    },[]);

    async function updatePost(ev){
        ev.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('tag', tag);
        data.set('content', content);
        data.set('id', id);
        if (files?.[0]) {
          data.set('file', files?.[0]);
        }
        const response = await fetch(Setting.urlApi+'/post', {
          method: 'PUT',
          body: data,
          credentials: 'include',
        });
        if (response.ok) {
          setRedirect(true);
        }
    }

    if(redirect){
        return <Navigate to={'/post/'+id}/>
    }

    return(
        <form onSubmit={updatePost}>
            <input type="title" 
                placeholder={'Title'}  
                value={title}
                onChange={ev=> setTitle(ev.target.value)}  />
            <input type="tag"
                placeholder={'Tags'}
                value={tag} 
                onChange={ev=> setTag(ev.target.value)} />
            <input type="summary" 
                placeholder={'Summary'} 
                value={summary}
                onChange={ev=> setSummary(ev.target.value)}/>
            <input type="file"
                onChange={ev=> setFiles(ev.target.files)} />
            <Editor value={content} onChange={setContent}></Editor>
            <button style={{marginTop:'5px'}}>Update Post</button>
        </form>
    );
}