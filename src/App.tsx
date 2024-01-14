import React from 'react';
import './App.css';
import Routing from './Routing';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routing />
    </div>
  );
}

export default App;
