import React from 'react';
import Wanshou from './features/counter/Chart/Wanshou.js';
import Baoqiao from './features/counter/Chart/Baoqiao.js';
import Comparison from './features/counter/Chart/Comparison.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Wanshou />
        <Baoqiao />
        <Comparison />
      </header>
    </div>
  );
}

export default App;
