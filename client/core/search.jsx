//axios and opening new tab
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


const isActive = (history, path) => {
  if (history.location.pathname == path)
    return { color: '#bef67a' }
  else
    return { color: '#ffffff' }
}



const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const history = useHistory(); //history hook

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get('/api/product', {
        params: {
          name: searchTerm,

        },
      });
      console.log(response.data);
      //   history.push(`/api/product?=name%${encodeURIComponent(searchTerm)}%`); 
      history.push(`/search?name=${encodeURIComponent(searchTerm)}`); //lists names of products
    } catch (error) {
      (error) => console.log(error)
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit} target='_blank' >
        <label htmlFor="header-search"></label>
        <input
          type="text"
          id="header-search"
          placeholder="Search for products"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <Button style={isActive(history)} type="submit">Search</Button>
      </form>
    </div>
  );
};

export default SearchBar;


