import React, { useEffect, useState } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevForm from './components/DevForm';
import DevItem from './components/DevItem';

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post('/devs', data);
    console.log(response.data);
    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <header className="app-header">
        <img src="data:image/png;base64,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" />
      </header>

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
