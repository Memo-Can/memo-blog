import React from 'react';
import {useContext, useState} from "react";
import { Link, useLocation, Navigate } from 'react-router-dom';

const SearchBar = ({onSearch }) => {
  const location = useLocation();
	
	const handleKeyDown = (event) => {
		if (event.key === 'Enter') 
			onSearch(event.target.value);
	};

  return (
		<input 
			className='search-bar' 
			type='text' 
			placeholder='Search...' 
			onKeyDown={handleKeyDown} 
		/>
  );
};

export default SearchBar;