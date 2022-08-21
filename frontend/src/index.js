import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WorkoutContextprovider } from './context/WorkoutContect';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(


  <React.StrictMode>
      <WorkoutContextprovider>
    <App />
    </WorkoutContextprovider>
  </React.StrictMode>
);
