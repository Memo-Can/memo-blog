import React,{ useContext,useEffect, useState,useRef  } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import {UserContext} from "../components/UserContext";
import Post from '../components/Post';

export default function IndexPage(){
	const {globalData} = useContext(UserContext);
	const [posts, setPosts]= useState([]);
	const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
	
	
	useEffect(()=>{
		const fetchPosts =  async () => {

			let url =`${require('../setting.json').urlApi}/post?page=${page}`;
		
			if(globalData.search)url+=`&search=${globalData.search}`;

			await fetch(url)
			.then(response=>{
				response.json().then(data=>{
						setPosts(data.posts);
						setTotalPages(data.totalPages);
					});
				});
			};
		fetchPosts();
	},[page,globalData]);


	const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };


	return(
		<> 
			<div className='post-index'>
				{
					 posts.length > 0 && posts.map(post=>( <Post key={post._id} {...post}/>))
				}
			</div>
			<div>
        <button onClick={handlePrevious} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={handleNext} disabled={page === totalPages}>
          Next
        </button>
      </div>
		</>
	);
}