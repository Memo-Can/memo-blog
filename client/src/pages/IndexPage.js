import Post from '../components/Post';
import { useEffect, useState } from 'react';

export default function IndexPage(){
	const [posts, setPosts]= useState([]);
		
	useEffect(()=>{
		const setting = require('../setting.json');
		let url=setting.urlApi+'/post';

		fetch(url).then(response=>{
				response.json().then(posts=>{
					setPosts(posts);
				});
		});
	},[]);

	const handleKeyDown = (event) => {

		if (event.key === 'Enter') {
			const setting = require('../setting.json');
			var url=setting.urlApi+'/post';
			if(event.target.value){
				url=setting.urlApi+'/search/'+event.target.value;
			}
			
			fetch(url).then(response=>{
					response.json().then(posts=>{
						setPosts(posts);
					});
			});

			

		}
	};

	return(
		<>
			<div  >
				<input className='searchBar' type='text' placeholder='Search' onKeyDown={handleKeyDown} />
			</div>
			<div className='postIndex'>
				
				{
					// posts.length > 0 ? (posts.map(post=>( <Post key={post._id} {...post}/>))): (alert('Post Not Found!'))
					posts.length > 0 && posts.map(post=>( <Post key={post._id} {...post}/>))
				}
			</div>
		</>
	);
}