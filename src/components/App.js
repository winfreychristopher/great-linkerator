import React, { useState, useEffect } from 'react';
import Links from './links'

import {
  getSomething
} from '../api';
import CreateLinks from './addLink';

const App = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    getSomething()
      .then(response => {
        setMessage(response.message);
      })
      .catch(error => {
        setMessage(error.message);
      });
  });

  return (
    <div className="App">
        <div>
          <CreateLinks />
        </div>

        <Links />
    </div>
  );
}

export default App;