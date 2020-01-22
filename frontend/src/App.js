import React, { useState, useEffect } from 'react';
import api from './services/api.js';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevForm from './components/DevForm/index.js';
import DevItem from './components/DevItem/index.js';

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const { data } = await api.get('/devs');

      setDevs(data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(dev) {
    const { data } = await api.post('/devs', dev);

    setDevs([...devs, data]);
  }

  return (
    <div id='app'>
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
