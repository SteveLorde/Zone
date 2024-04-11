import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {MainContext} from "./Services/State/MainContext.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <MainContext.Provider value={{shit: ""}}>
          <App />
      </MainContext.Provider>
  </React.StrictMode>,
);
