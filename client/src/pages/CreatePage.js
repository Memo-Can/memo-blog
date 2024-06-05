import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Setting from "../setting.json";
import Editor from "../components/Editor";
// import ComboBox from "../components/ComboBox";

export default function CreatePage (){
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [tag, setTag] = useState('');
    const [content, setContent]= useState('');
    const [files, setFiles]= useState('');
    const [redirect, setRedirect]= useState(false);
    // const [selectedOption, setSelectedOption] = useState(null);
     //const [categories, setCategories]= useState([]);

     useEffect(()=>{
        // fetch(Setting.urlApi +'/category').then(response=>{
        //     response.json().then(categories=>{
        //         setCategories(categories);
        //     });
        // });
    },[]);


    async function createNewPost(ev){
        const data = new FormData();
        data.set('title',title);
        data.set('summary',summary);
        data.set('tag',tag);
        data.set('content',content);
        data.set('file', files[0]);
        ev.preventDefault();

        const response = await fetch(Setting.urlApi+"/post",{
            method:'POST',
            body: data,
            credentials:'include',
        });
        if(response.ok){
            setRedirect(true);
        }
    }

    if(redirect){
       return <Navigate to={'/'}/>
    }
		
    return(
        <form onSubmit={createNewPost}>
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
            <button style={{marginTop:'5px'}}>Create Post</button>
        </form>
    );
};