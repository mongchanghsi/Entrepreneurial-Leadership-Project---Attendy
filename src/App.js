import React from 'react';
import './App.css';
import Navbar from './Navbar';
import Card from './Card';

function App() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="center">
          <Card />
        </div>
      </div>
    </div>
  );
}

export default App;
