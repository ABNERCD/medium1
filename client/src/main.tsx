import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import 'bootswatch/dist/darkly/bootstrap.min.css';
import 'animate.css'; // <-- LÍNEA AÑADIDA
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);