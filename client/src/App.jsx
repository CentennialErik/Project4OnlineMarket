import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainRouter from '../MainRouter';


const App = () => {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return (
    
  <div style={{ backgroundColor: '#FCF9E6', minHeight: '100vh'}}>  
    <Router>
  <MainRouter />
      </Router>
       </div>
  );
};


export default App;


