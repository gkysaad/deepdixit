import React, { useState } from 'react';
import Home from './Home';
import Game from './Game';
import About from './About';
import Results from './Results';
import './index.css';

function App() {

  const [page, setPage] = useState('home'); 

  return (
    <div>
      {page === 'home' && <Home pageSetter={setPage}/>}
      {page === 'game' && <Game pageSetter={setPage}/>}
      {page === 'about' && <About pageSetter={setPage}/>}
      {page === 'results' && <Results pageSetter={setPage}/>}
    </div>

  );
}

export default App;
