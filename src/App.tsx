import React, { useState } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import { addTorrent, TorrentSerial } from './features/torrent/torrentSlice';

function App() {
  const dispatch = useDispatch();
  dispatch({ type: "WS_CONNECT", host: "wss://echo.websocket.org"});
  return (
    <div className="App">
      <Torrents />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

const Torrents: React.FC = props => {
  const torrents = useSelector((store: RootState) => store.torrent.torrents);
  const dispatch = useDispatch();

  const [magnet, setMagnet] = useState<string>("");
  const onClick = () => {
    dispatch(addTorrent(magnet));
  }

  return (<>
    <h2>Torrents:</h2>
    {torrents.map(t => <Torrent key={t.torrentId} torrent={t} />)}
    <input value={magnet} onChange={(e) => setMagnet(e.target.value)}/>
    <button onClick={onClick}>Add Torrent</button>
  </>)
}

const Torrent: React.FC<{ torrent: TorrentSerial }> = ({torrent}) => {
  return (<div>
    <pre>{JSON.stringify(torrent, null, 1)}</pre>
  </div>)
}
export default App;
