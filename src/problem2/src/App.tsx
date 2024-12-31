import React from 'react';
import TokenSwapForm from './components/TokenSwapForm';
import './App.css';
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {
  return (
    <div className=" flex items-center flex-col">
      
      <TokenSwapForm />
      <ToastContainer/>
    </div>
  );
};

export default App;
