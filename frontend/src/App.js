import React from 'react';
import GameMap from './GameMap';
import SettlementSetups from './SettlementSetups';
import io from 'socket.io-client';

import './App.scss';

const App = () => {
  const socket = io('http://localhost:5001');

  return ( <div className="app-wrapper">
    <GameMap></GameMap>
  </div> )
};

export default App;
