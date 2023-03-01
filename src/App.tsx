import React from 'react';
import './App.css';
import GameBody from './components/GameBody';
import TitleGame from './components/TitleGame';

const App = () => {
  return (
    <div className="App">
        <TitleGame/>
        <GameBody/>
    </div>
  );
}

export default App;
