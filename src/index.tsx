import React from 'react';

import ReactDOM from 'react-dom/client';

import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Cambia de unregister a register para activar el Service Worker
serviceWorkerRegistration.register();
