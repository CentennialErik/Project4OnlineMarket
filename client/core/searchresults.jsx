import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchResults = async () => {
      const params = new URLSearchParams(location.search);
      const name = params.get('name');
      try {
        const response = await axios.get('/api/product', {
          params: {
            name: name,
          },
        });
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchResults();
  }, [location]);

  return (
    <div>
      {results.map((result, index) => (
      <div key={index}>
    <h1>{result.name}</h1>
    <p>{result.description}</p>
    <p>${result.price}</p>
  </div>
      ))}
    </div>
  );
};

export default SearchResults;