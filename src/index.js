import React from 'react';
import ReactDOM from 'react-dom';
import ContextApi from './context/ContextApi';
import './index.css';
import Routes from './routes';

ReactDOM.render(
  <React.StrictMode>
    <ContextApi>
      <Routes />
    </ContextApi>
  </React.StrictMode>,
  document.getElementById('root')
);

