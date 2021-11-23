import React from 'react';
import logo from './logo.svg';
import './App.css';
import AudioContextComponent from './audioContext/index';
// import { init } from './audioContext/audioContext';
import { main } from './audioContext/mic-recorder';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          Edit <code>src/App.tsx</code> and save to reload.
          {/* <button onClick={init}>Start / Resume</button> */}
          <AudioContextComponent />

        </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
