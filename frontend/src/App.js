import React from 'react';
import GameMap from './GameMap';
import io from 'socket.io-client';

import './App.scss';

const App = () => {
	//   //SOCKET WITH CUSTOM NAME BELOW
	//   // const socket2 = io('http://localhost:5001/my-namespace');
	//   // console.log(socket2);
	//   //SOCKET WITH CUSTOM NAME ABOVE

	const socket = io('http://localhost:5001');

	return (<div className="app-wrapper">
		<GameMap socket={socket}></GameMap>
	</div>)
};

export default App;
