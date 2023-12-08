import React, { useEffect, useState } from 'react';
// import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import CirculatProgress from '@material-ui/core/CirculatProgress';


const myBox = {
  outline: '5px solid black',
}

export default function Products() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Fetch product data from an API or database
    const fetchProducts = async () => {
      try {
        const response = await fetch ('/api/prudct');
        const data = await response.json();
        setProducts(data);
      }
      catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      };
      fetchProducts ();
  }, []);
  return (
    <div>
      {loading ? (
      <CirculatProgress stlye={{ margin: '50px' }} />
      ) : (
      {products.map((product) => (
        <div style={myBox} key={product.id}>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>${product.price}</p>
        </div>
      ))
    )}
    </div>
  );
}
