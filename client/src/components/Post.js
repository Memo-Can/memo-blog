import {format} from 'date-fns';
import setting from '../setting.json'
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

export default function Post({_id,title,summary,cover,createdAt,author}){

	// useEffect(()=>{
	// 	if(!_id)
	// 		return(<h1>Post Not Found!</h1>)
	// },[]);

	return(
		<div className="post" >
			<div className="texts">
				<Link to={`/post/${_id}`}>
					<h2>{title}</h2>
				</Link>
				<p className="info">
					<time>{format(new Date(createdAt),'yyyy-MM-dd')}</time>
				</p>
				<p className="summary"> {summary}</p>
			</div>
		</div>
	);
};