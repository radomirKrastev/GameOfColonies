import React from 'react';
import GameMap from './GameMap';
import ActionComponent from './ActionComponent';

import './App.scss';

const App = () => (
  <div className="app-wrapper">
    <GameMap></GameMap>
    <ActionComponent></ActionComponent>
  </div>
);

export default App;
