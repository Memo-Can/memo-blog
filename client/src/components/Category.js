import setting from '../setting.json'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Category(){
    const [categories, setCategories]= useState([]);
    
    useEffect(()=>{
        fetch(setting.urlApi +'/category').then(response=>{
            response.json().then(categories=>{
                setCategories(categories);
            });
        });
    },[]);

    return(
        <>
            {categories.length>0&& categories.map(category=>(
                <Link to={`/category/${category._id}`} key={category._id}>
                    <h5>{category.title}</h5>
                </Link>
            ))}
       
        </>
       
    );
}