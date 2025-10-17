// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { CuadrantesProvider } from './context/CuadrantesContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CuadrantesProvider>
      <App />
    </CuadrantesProvider>
  </React.StrictMode>
);